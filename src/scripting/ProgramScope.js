import Rx from 'rx';


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
		const programScope = new ProgramScope([], null);
		programScope.loadFromData(programData);
		return programScope;
	}

	constructor(scopePath, parentScope) {
		this.scopePath = scopePath;
		this.parentScope = parentScope;
		this.variables = new Map();
	}

	loadFromData(programData) {
		const name = programData.name;
		if (!this.equalsScope(name)) {
			throw new Error(`Failed to load scope, invalid name got ${name} but expecting ${this.scopePath}`);
		}
		const variables = programData.variables;
		variables.forEach(variableData => this.defineLocalVariable(variableData.name));
		variables.forEach(variableData => this.loadBinding(variableData.name, variableData.binding));

		// const scopes = programData.scopes;
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
		if (!binding) {
			return;
		}
		const variable = this.variables.get(name);
		const bindTo = this.getVariable(binding.variable);
		variable.bindProperty(bindTo, binding.property);
	}

	getNamedVariable(variableName) {
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

	getVariable(variableName) {
		const scope = this.getScopeFromName(variableName);
		if (!scope) {
			throw new Error(`Failed to find scope for variable '${variableName}'`);
		}
		const variable = scope.getNamedVariable(variableName);
		if (!variable) {
			throw new Error(`Failed to find variable '${variableName}'`);
		}
		return variable;
	}

	setValue(variableName, value) {
		const variable = this.getVariable(variableName);
		variable.setValue(value);
	}

	getValue(variableName) {
		const variable = this.getVariable(variableName);
		return variable.getValue();
	}

	getValueStream(variableName) {
		return this.getVariable(variableName).getStream();
	}
}
