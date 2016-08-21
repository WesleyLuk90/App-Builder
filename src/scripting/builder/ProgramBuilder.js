import _ from 'lodash';

import AllTypes from '../types/AllTypes';
import ComputedVariableBuilder from './ComputedVariableBuilder';
import VariableBuilder from './VariableBuilder';
import Path from './Path';

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
				builder.addNormalVariable(variable.name, type);
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
		this.scopePath = Path.newPath(scope);
		this.variables = [];
		this.childScopes = new Map();
	}

	getScopePath() {
		return this.scopePath;
	}

	addScope(scope) {
		const childScopePath = scope.getScopePath();
		if (!childScopePath.isDescendantOf(this.scopePath)) {
			throw new Error(`Can not add scope, ${scope} is not a child of ${this.scopePath}`);
		}
		this.childScopes.set(childScopePath.toString(), scope);
		scope.setParentBuilder(this);
		return this;
	}

	setParentBuilder(builder) {
		this.parentBuilder = builder;
	}

	addVariable(variable) {
		this.variables.push(variable);
		variable.setProgramBuilder(this);
	}

	getParameterVariable(parameter) {
		console.log(parameter);
		return null;
	}

	addNormalVariable(name, type) {
		this.addVariable(VariableBuilder.createSimple(name, type));
		return this;
	}

	addBoundVariable(name, type, otherVariableBuilder, property) {
		this.addVariable(VariableBuilder.createPropertyBound(name, type, otherVariableBuilder, property));
		return this;
	}

	addComputedVariable(name, type, computedVariableBuilderBuilder) {
		this.addVariable(VariableBuilder.createComputed(name, type, computedVariableBuilderBuilder));
		return this;
	}

	getVariableByName(name) {
		return _.find(this.variables, v => v.getName() === name);
	}

	getVariableType(name) {
		return this.getVariableByName(name).getVariableType();
	}

	getVariablesInScope() {
		let parentVariables = [];
		if (this.parentBuilder) {
			parentVariables = this.parentBuilder.getVariablesInScope();
		}
		return [...this.variables, ...parentVariables];
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
			name: this.scopePath.toJSONObject(),
			variables: this.variablesToJSONObject(),
			scopes: this.scopesToJSONObject(),
		};
	}
}
