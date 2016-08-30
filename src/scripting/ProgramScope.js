import ChangeTokenGenerator from './ChangeTokenGenerator';
import Variable from './Variable';
import AllTypes from './types/AllTypes';
import Path from './builder/Path';

/**
 * interface ProgramScope {
 * 		getValue(variableName): value;
 * 		setValue(variableName);
 * 		getStream(variableName): Rx.Observable
 * }
 */
export default class ProgramScope {
	static create(programData) {
		const programScope = new ProgramScope(Path.rootPath(), null, new ChangeTokenGenerator());
		programScope.loadFromData(programData);
		return programScope;
	}

	constructor(scopePath, parentScope, tokenGenerator) {
		if (!Path.isInstance(scopePath)) {
			throw new Error(`ScopePath must be instance of Path got ${scopePath}`);
		}
		this.scopePath = scopePath;
		this.parentScope = parentScope;
		this.tokenGenerator = tokenGenerator;
		this.variables = new Map();
		this.childScopes = new Map();
	}

	getScopePath() {
		return this.scopePath;
	}

	getChildScopeList(scopeName) {
		if (!this.childScopes.has(scopeName)) {
			this.childScopes.set(scopeName, new Map());
		}
		return this.childScopes.get(scopeName);
	}

	getChildScope(scopeLocalName, index) {
		const scopePath = this.scopePath.createChild(scopeLocalName);
		const scopeFullName = scopePath.toString();
		if (!this.childScopeDefinitions[scopeFullName]) {
			throw new Error(`No child scope defined for ${scopeFullName}`);
		}
		const childScopeData = this.childScopeDefinitions[scopeFullName];
		const scopeList = this.getChildScopeList(scopeFullName);
		if (!scopeList.has(index)) {
			const childScope = new ProgramScope(scopePath, this, this.tokenGenerator);
			childScope.loadFromData(childScopeData);
			scopeList.set(index, childScope);
		}
		return scopeList.get(index);
	}

	defineLocalVariable(localName, type) {
		const variable = Variable.createVariable(type);
		this.variables.set(localName, variable);
	}

	loadBinding(localName, binding) {
		const variable = this.variables.get(localName);
		const bindTo = this.getVariable(Path.newPath(binding.variableName));
		variable.bindProperty(bindTo, binding.property);
	}

	loadComputed(localName, computation) {
		const variable = this.variables.get(localName);
		const variables = computation.parameters.map(parameter => this.getVariable(Path.newPath(parameter.variableName)));
		const parameters = computation.parameters.map(parameter => parameter.localName);

		variable.bindComputed(variables, parameters, computation.body);
	}

	/**
	 * Gets a local variable given its fully qualified scope path
	 * @param  {[type]} variableName [description]
	 * @return {[type]}              [description]
	 */
	getLocalVariable(variablePath) {
		return this.variables.get(variablePath.tail());
	}

	/**
	 * Gets a variable given its fully qualified scope path, searches through parent scopes too
	 * @param  Path variablePath [description]
	 * @return Variable              [description]
	 */
	getVariable(variablePath) {
		// Get the scope that the variable is in
		const variableScopePath = variablePath.getParentPath();
		// Count how many ancestores we have to go up
		const parentCount = this.scopePath.getAncestorDistance(variableScopePath);
		let scope = this;
		for (let i = 0; i < parentCount; i++) {
			scope = scope.getParent();
		}
		const variable = scope.getLocalVariable(variablePath);
		if (!variable) {
			throw new Error(`Failed to find variable '${variablePath}'`);
		}
		return variable;
	}

	getParent() {
		return this.parentScope;
	}

	setValue(variableName, value) {
		const variable = this.getVariable(Path.newPath(variableName));
		variable.setValue(value, this.tokenGenerator.nextToken());
	}

	getValue(variableName) {
		const variable = this.getVariable(Path.newPath(variableName));
		return variable.getValue();
	}

	getValueStream(variableName) {
		return this.getVariable(Path.newPath(variableName)).getStream();
	}

	loadFromData(programData) {
		const name = programData.name;
		const path = Path.newPath(name);
		if (!this.scopePath.equals(path)) {
			throw new Error(`Failed to load scope, invalid name got ${name} but expecting ${this.scopePath}`);
		}
		const variables = programData.variables;
		variables
			.forEach(variableData => this.defineLocalVariable(variableData.localName, AllTypes.fromData(variableData.type)));
		variables
			.filter(variableData => variableData.binding)
			.forEach(variableData => this.loadBinding(variableData.localName, variableData.binding));
		variables
			.filter(variableData => variableData.computation)
			.forEach(variableData => this.loadComputed(variableData.localName, variableData.computation));

		this.childScopeDefinitions = programData.scopes;
	}
}
