class Variable {
	static createSimple(name, type) {
		const variable = new Variable();
		variable.name = name;
		variable.type = type;
		return variable;
	}

	static createPropertyBound(name, type, otherVariable, property) {
		const variable = Variable.createSimple(name, type);
		variable.binding = {
			variable: otherVariable,
			property,
		};
		return variable;
	}

	static createComputed(name, type, computedVariableBuilder) {
		const variable = Variable.createSimple(name, type);
		variable.computedVariableBuilder = computedVariableBuilder;
		return variable;
	}

	toJSONObject() {
		const object = {
			name: this.name,
			type: this.type.toJSONObject(),
		};
		if (this.binding) {
			object.binding = this.binding;
		}
		if (this.computedVariableBuilder) {
			object.computation = this.computedVariableBuilder.toJSONObject();
		}
		return object;
	}
}

export default class ProgramBuilder {
	static newBuilder() {
		return new ProgramBuilder([]);
	}

	static newScope(scope) {
		return new ProgramBuilder(scope);
	}

	constructor(scope) {
		if (!Array.isArray(scope)) {
			throw new Error(`Scope must be an array, got ${scope}`);
		}
		this.scope = scope;
		this.variables = [];
		this.childScopes = new Map();
	}

	getScopeName() {
		return this.scope[this.scope.length - 1];
	}

	addScope(scope) {
		this.childScopes.set(scope.getScopeName(), scope);
		return this;
	}

	addVariable(name, type) {
		this.variables.push(Variable.createSimple(name, type));
		return this;
	}

	addBoundVariable(variable, type, otherVariable, property) {
		this.variables.push(Variable.createPropertyBound(variable, type, otherVariable, property));
		return this;
	}

	addComputedVariable(variable, type, computedVariableBuilder) {
		this.variables.push(Variable.createComputed(variable, type, computedVariableBuilder));
		return this;
	}

	variablesToJSONObject() {
		const variables = [];
		this.variables.forEach((variable) => {
			variables.push(variable.toJSONObject());
		});
		return variables;
	}

	scopesToJSONObject() {
		const scopes = {};
		this.childScopes.forEach((scope, name) => {
			scopes[name] = scope.toJSONObject();
		});
		return scopes;
	}

	toJSONObject() {
		return {
			name: this.scope,
			variables: this.variablesToJSONObject(),
			scopes: this.scopesToJSONObject(),
		};
	}
}
