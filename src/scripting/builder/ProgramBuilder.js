import _ from 'lodash';

import AllTypes from '../types/AllTypes';
import ComputedVariableBuilder from './ComputedVariableBuilder';
import VariableBuilder from './VariableBuilder';

export default class ProgramBuilder {
	static newBuilder() {
		return new ProgramBuilder([]);
	}

	static newScope(scope) {
		return new ProgramBuilder(scope);
	}

	static fromData(data) {
		const builder = ProgramBuilder.newScope(data.name);
		data.variables.forEach(variable => {
			const type = AllTypes.fromData(variable.type);
			if (variable.computation) {
				const computedVariableBuilderBuilder = ComputedVariableBuilder.newBuilder()
					.setBody(variable.computation.body);

				variable.computation.parameters.forEach(param => {
					computedVariableBuilderBuilder.addParameter(param.variable, param.localVariable);
				});
				builder.addComputedVariable(variable.name, type, computedVariableBuilderBuilder);
			} else if (variable.binding) {
				builder.addBoundVariable(variable.name, type, variable.binding.variable, variable.binding.property);
			} else {
				builder.addVariable(variable.name, type);
			}
		});
		Object.keys(data.scopes).forEach(scopeName => {
			const scope = data.scopes[scopeName];
			const scopedProgramBuilder = ProgramBuilder.fromData(scope);
			builder.addScope(scopedProgramBuilder);
		});
		return builder;
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
		this.variables.push(VariableBuilder.createSimple(name, type));
		return this;
	}

	addBoundVariable(name, type, otherVariableBuilder, property) {
		this.variables.push(VariableBuilder.createPropertyBound(name, type, otherVariableBuilder, property));
		return this;
	}

	addComputedVariable(name, type, computedVariableBuilderBuilder) {
		this.variables.push(VariableBuilder.createComputed(name, type, computedVariableBuilderBuilder));
		return this;
	}

	getVariableByName(name) {
		return _.find(this.variables, v => v.getName() === name);
	}

	getVariableType(name) {
		return this.getVariableByName(name).getVariableType();
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
