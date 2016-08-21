import ComputedVariableBuilder from './ComputedVariableBuilder';
import Path from './Path';
import Type from '../types/Type';
import VariableTypes from './VariableType';

export default class VariableBuilder {
	static createSimple(localName, type) {
		const variable = new VariableBuilder();
		variable.localName = localName;
		variable.setType(type);
		variable.binding = { variableName: [], property: '' };
		variable.computedVariableBuilder = ComputedVariableBuilder.newBuilder();
		variable.setVariableType(VariableTypes.NORMAL);
		return variable;
	}

	static createPropertyBound(localName, type, otherVariable, property) {
		const variable = VariableBuilder.createSimple(localName, type);
		variable.binding = {
			variableName: otherVariable,
			property,
		};
		variable.setVariableType(VariableTypes.BOUND);
		return variable;
	}

	static createComputed(localName, type, computedVariableBuilder) {
		const variable = VariableBuilder.createSimple(localName, type);
		variable.computedVariableBuilder = computedVariableBuilder;
		variable.setVariableType(VariableTypes.COMPUTED);
		return variable;
	}

	setProgramBuilder(programBuilder) {
		this.programBuilder = programBuilder;
	}

	getProgramBuilder() {
		return this.programBuilder;
	}

	setVariableType(variableType) {
		this.variableType = variableType;
	}

	getVariableType() {
		return this.variableType;
	}

	setType(type) {
		if (!Type.isType(type)) {
			throw new Error(`Type must be a type, got ${type}`);
		}
		this.type = type;
	}

	getType() {
		return this.type;
	}

	isBound() {
		return this.variableType === VariableTypes.BOUND;
	}

	isComputed() {
		return this.variableType === VariableTypes.COMPUTED;
	}

	getLocalName() {
		return this.localName;
	}

	getVariablePath() {
		return this.programBuilder.getScopePath().createChild(this.getLocalName());
	}

	getBoundVariableName() {
		return this.binding.variableName;
	}

	getBoundVariablePath() {
		return Path.newPath(this.binding.variableName);
	}

	getBoundProperty() {
		return this.binding.property;
	}

	getComputationBody() {
		return this.computedVariableBuilder.getBody();
	}

	getParameters() {
		return this.computedVariableBuilder.getParameters();
	}

	toJSONObject() {
		const object = {
			localName: this.localName,
			type: this.type.toJSONObject(),
		};
		if (this.isBound()) {
			object.binding = this.binding;
		}
		if (this.isComputed()) {
			object.computation = this.computedVariableBuilder.toJSONObject();
		}
		return object;
	}
}
