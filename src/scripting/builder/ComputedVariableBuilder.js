export default class ComputedVariableBuilder {
	static newBuilder() {
		return new ComputedVariableBuilder();
	}

	constructor() {
		this.parameters = new Map();
		this.body = null;
	}

	addParameter(variable, localName) {
		this.parameters.set(localName, variable);
		return this;
	}

	setBody(body) {
		this.body = body;
		return this;
	}

	parametersToJSONObject() {
		const parameters = [];
		this.parameters.forEach((variable, localName) => {
			parameters.push({
				variable,
				localVariable: localName,
			});
		});
		return parameters;
	}

	toJSONObject() {
		return {
			parameters: this.parametersToJSONObject(),
			body: this.body,
		};
	}
}
