import Rx from 'rx';

export default class Edit {

	constructor() {
		// Used to broadcast changes globally when it is hard to notify the component directly
		this.globalChangeStream = new Rx.Subject();
	}

	getGlobalChangeStream() {
		return this.globalChangeStream;
	}

	setVariableVariableType(variableBuilder, type) {
		variableBuilder.setVariableType(type);

		this.globalChangeStream.onNext();
	}

	setVariableBinding(variableBuilder, bindToVariableName, property) {
		variableBuilder.setVariableBinding(bindToVariableName, property);
	}

	switchToNamedVariableBinding(component, option) {
		component.switchToNamedVariableBinding(option);
	}

	switchToStaticValueBinding(component, option) {
		component.switchToStaticValueBinding(option);
	}

	setComponentVariableBinding(component, option, variableBuilder) {
		component.setNamedVariableBinding(option, variableBuilder.getVariablePath().toName());
	}

	setComponentStaticValue(component, option, value) {
		component.setOptionStaticValue(option, value);
	}

	removeComponent(parent, component) {
		parent.removeChildComponent(component);
	}

	renameVariable(variable, newName) {
		// TODO:
		// Find all uses and rename them too
		// Check for duplicate names
		variable.setLocalName(newName);

		this.globalChangeStream.onNext();
	}

	setComputedVariableBody(variable, body) {
		variable.setComputationBody(body);
	}

	setComputedVariableParameters(variable, parameters) {
		variable.setComputedVariableParameters(parameters);
	}
}
