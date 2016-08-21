
export default class ParameterBuilder {
	constructor(variable, localName) {
		this.variable = variable;
		this.localName = localName;
	}

	getLocalName() {
		return this.localName;
	}

	getVariable() {
		return this.variable;
	}
}
