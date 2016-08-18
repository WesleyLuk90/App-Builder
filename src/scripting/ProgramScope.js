import ChangeTokenGenerator from './ChangeTokenGenerator';
import Variable from './Variable';
/**
 * interface ProgramScope {
 * 		getValue(variableName): value;
 * 		setValue(variableName);
 * 		getStream(variableName): Rx.Observable
 * }
 */
export default class ProgramScope {
	static create(programData) {
		const programScope = new ProgramScope([], null, new ChangeTokenGenerator());
		programScope.loadFromData(programData);
		return programScope;
	}

	constructor(scopePath, parentScope, tokenGenerator) {
		this.scopePath = scopePath;
		this.parentScope = parentScope;
		this.tokenGenerator = tokenGenerator;
		this.variables = new Map();
		this.childScopes = new Map();
	}

	loadFromData(programData) {
		const name = programData.name;
		if (!this.equalsScope(name)) {
			throw new Error(`Failed to load scope, invalid name got ${name} but expecting ${this.scopePath}`);
		}
		const variables = programData.variables;
		variables
			.forEach(variableData => this.defineLocalVariable(variableData.name));
		variables
			.filter(variableData => variableData.binding)
			.forEach(variableData => this.loadBinding(variableData.name, variableData.binding));
		variables
			.filter(variableData => variableData.computation)
			.forEach(variableData => this.loadComputed(variableData.name, variableData.computation));

		this.childScopeDefinitions = programData.scopes;
	}

	getChildScopeList(scopeName) {
		if (!this.childScopes.has(scopeName)) {
			this.childScopes.set(scopeName, new Map());
		}
		return this.childScopes.get(scopeName);
	}

	getChildScope(scopeName, index) {
		if (!this.childScopeDefinitions[scopeName]) {
			throw new Error(`No child scope defined for ${scopeName}`);
		}
		const childScopeData = this.childScopeDefinitions[scopeName];
		const scopeList = this.getChildScopeList(scopeName);
		if (!scopeList.has(index)) {
			const childScope = new ProgramScope(childScopeData.name, this, this.tokenGenerator);
			childScope.loadFromData(childScopeData);
			scopeList.set(index, childScope);
		}
		return scopeList.get(index);
	}

	getScopeFromName(variableName) {
		const scopeName = variableName.slice(0, -1);
		let currentScope = this;
		while (currentScope) {
			if (currentScope.equalsScope(scopeName)) {
				return currentScope;
			}
			currentScope = currentScope.getParent();
		}
		return currentScope;
	}

	defineLocalVariable(name) {
		const variable = Variable.createVariable();
		this.variables.set(name, variable);
	}

	loadBinding(name, binding) {
		const variable = this.variables.get(name);
		const bindTo = this.getVariable(binding.variable);
		variable.bindProperty(bindTo, binding.property);
	}

	loadComputed(name, computation) {
		const variable = this.variables.get(name);
		const variables = computation.parameters.map(parameter => this.getVariable(parameter.variable));
		const parameters = computation.parameters.map(parameter => parameter.localVariable);

		variable.bindComputed(variables, parameters, computation.body);
	}

	/**
	 * Gets a local variable given its fully qualified scope path
	 * @param  {[type]} variableName [description]
	 * @return {[type]}              [description]
	 */
	getLocalVariable(variableName) {
		const variableIdentifier = variableName[variableName.length - 1];
		return this.variables.get(variableIdentifier);
	}

	equalsScope(scope) {
		if (scope.length !== this.scopePath.length) {
			return false;
		}
		for (let i = 0; i < scope.length; i++) {
			if (scope[i] !== this.scopePath[i]) {
				return false;
			}
		}
		return true;
	}

	getParent() {
		return this.parentScope;
	}

	/**
	 * Gets a variable given its fully qualified scope path, searches through parent scopes too
	 * @param  Array<string> variableName [description]
	 * @return Variable              [description]
	 */
	getVariable(variableName) {
		const scope = this.getScopeFromName(variableName);
		if (!scope) {
			throw new Error(`Failed to find scope for variable '${variableName}' from scope '${this.scopePath}'`);
		}
		const variable = scope.getLocalVariable(variableName);
		if (!variable) {
			throw new Error(`Failed to find variable '${variableName}'`);
		}
		return variable;
	}

	setValue(variableName, value) {
		const variable = this.getVariable(variableName);
		variable.setValue(value, this.tokenGenerator.nextToken());
	}

	getValue(variableName) {
		const variable = this.getVariable(variableName);
		return variable.getValue();
	}

	getValueStream(variableName) {
		return this.getVariable(variableName).getStream();
	}
}
