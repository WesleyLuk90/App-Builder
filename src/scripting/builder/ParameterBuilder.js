export default class ParameterBuilder {
	constructor(variablePath, localName) {
		this.variablePath = variablePath;
		this.localName = localName;
	}

	getLocalName() {
		return this.localName;
	}

	getVariablePath() {
		return this.variablePath;
	}

	toJSONObject() {
		return {
			variableName: this.variablePath.toJSONObject(),
			localName: this.localName,
		};
	}
}
