export default class Edit {

	setVariableVariableType(variableBuilder, type) {
		variableBuilder.setVariableType(type);
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
}
