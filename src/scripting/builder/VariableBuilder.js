import VariableTypes from './VariableType';
import ComputedVariableBuilder from './ComputedVariableBuilder';

export default class VariableBuilder {
	static createSimple(name, type) {
		const variable = new VariableBuilder();
		variable.name = name;
		variable.type = type;
		variable.binding = { variable: [], property: '' };
		variable.computedVariableBuilder = ComputedVariableBuilder.newBuilder();
		variable.setType(VariableTypes.NORMAL);
		return variable;
	}

	static createPropertyBound(name, type, otherVariable, property) {
		const variable = VariableBuilder.createSimple(name, type);
		variable.binding = {
			variable: otherVariable,
			property,
		};
		variable.setType(VariableTypes.BOUND);
		return variable;
	}

	static createComputed(name, type, computedVariableBuilder) {
		const variable = VariableBuilder.createSimple(name, type);
		variable.computedVariableBuilder = computedVariableBuilder;
		variable.setType(VariableTypes.COMPUTED);
		return variable;
	}

	setProgramBuilder(programBuilder) {
		this.programBuilder = programBuilder;
	}

	getProgramBuilder() {
		return this.programBuilder;
	}

	setType(variableType) {
		this.variableType = variableType;
	}

	getVariableType() {
		return this.variableType;
	}

	isBound() {
		return this.variableType === VariableTypes.BOUND;
	}

	isComputed() {
		return this.variableType === VariableTypes.COMPUTED;
	}

	getName() {
		return this.name;
	}

	getBoundVariable() {
		return this.binding.variable;
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
			name: this.name,
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
