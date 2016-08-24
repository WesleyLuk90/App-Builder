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
				const computedVariableBuilder = ComputedVariableBuilder.newBuilder()
					.setBody(variable.computation.body);

				variable.computation.parameters.forEach(param => {
					computedVariableBuilder.addParameter(param.variableName, param.localName);
				});
				builder.addComputedVariable(variable.localName, type, computedVariableBuilder);
			} else if (variable.binding) {
				builder.addBoundVariable(variable.localName, type, variable.binding.variableName, variable.binding.property);
			} else {
				builder.addNormalVariable(variable.localName, type);
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

	getScope(scopePath) {
		if (scopePath.equals(this.scopePath)) {
			return this;
		}
		if (scopePath.isAncestorOf(this.scopePath)) {
			return this.getParent().getScope(scopePath);
		}
		// Otherwise its a child
		const nextComponent = scopePath.getComponent(this.scopePath.length);
		const childScopePath = this.scopePath.createChild(nextComponent);
		return this.childScopes.get(childScopePath.toString());
	}

	setParentBuilder(builder) {
		this.parentBuilder = builder;
	}

	addVariable(variable) {
		this.variables.push(variable);
		variable.setProgramBuilder(this);
	}

	getParameterVariable(parameter) {
		const variables = this.getVariablesInScope();
		return _.find(variables, v => v.getVariablePath().equals(parameter.getVariablePath()));
	}

	addNormalVariable(name, type) {
		this.addVariable(VariableBuilder.createSimple(name, type));
		return this;
	}

	addBoundVariable(name, type, otherVariableBuilder, property) {
		this.addVariable(VariableBuilder.createPropertyBound(name, type, otherVariableBuilder, property));
		return this;
	}

	addComputedVariable(name, type, computedVariableBuilder) {
		this.addVariable(VariableBuilder.createComputed(name, type, computedVariableBuilder));
		return this;
	}

	getLocalVariables() {
		return this.variables.slice();
	}

	getLocalVariable(variablePath) {
		if (!variablePath.getParentPath().equals(this.scopePath)) {
			throw new Error(`Can not get local variable '${variablePath}' from '${this.scopePath}'`);
		}
		const variableLocalName = variablePath.tail();
		return _.find(this.variables, v => v.getLocalName() === variableLocalName);
	}

	getVariablesInScope() {
		let parentVariables = [];
		if (this.parentBuilder) {
			parentVariables = this.parentBuilder.getVariablesInScope();
		}
		return [...this.variables, ...parentVariables];
	}

	getVariableByPath(variablePath) {
		const variableScope = variablePath.getParentPath();
		const parentCount = this.scopePath.getAncestorDistance(variableScope);
		let builder = this;
		for (let i = 0; i < parentCount; i++) {
			builder = builder.getParent();
		}
		return builder.getLocalVariable(variablePath);
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
