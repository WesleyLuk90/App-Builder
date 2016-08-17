class Variable {
	static createSimple(name, type) {
		const variable = new Variable();
		variable.name = name;
		variable.type = type;
		return variable;
	}
	static createBound(name, type, binding) {
		const variable = Variable.createSimple(name, type);
		variable.binding = binding;
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

	constructor(scope) {
		this.scope = scope;
		this.variables = [];
	}

	getNamedScope(scope) {
		const childScope = [...this.scope, scope];
		const newBuilder = new ProgramBuilder(childScope);

		return newBuilder;
	}

	addVariable(name, type) {
		this.variables.push(Variable.createSimple(name, type));
		return this;
	}

	addBoundVariable(variable, type, binding) {
		this.variables.push(Variable.createBound(variable, type, binding));
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
		return {};
	}

	toJSONObject() {
		return {
			name: this.scope,
			variables: this.variablesToJSONObject(),
			scopes: this.scopesToJSONObject(),
		};
	}
}
