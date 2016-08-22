export default class Edit {

	setVariableVariableType(variableBuilder, type) {
		variableBuilder.setVariableType(type);
	}

	setVariableBinding(variableBuilder, bindToVariableName, property) {
		variableBuilder.setVariableBinding(bindToVariableName, property);
		console.log(variableBuilder);
	}
}
