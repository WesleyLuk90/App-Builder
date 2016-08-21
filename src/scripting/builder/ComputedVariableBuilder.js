import ParameterBuilder from './ParameterBuilder';

export default class ComputedVariableBuilder {
	static newBuilder() {
		return new ComputedVariableBuilder();
	}

	constructor() {
		this.parameters = new Map();
		this.body = null;
	}

	addParameter(variable, localName) {
		if (!variable) {
			throw new Error(`Variable is required, got '${variable}`);
		}
		if (!localName) {
			throw new Error(`Variable is required, got '${localName}`);
		}
		this.parameters.set(localName, variable);
		return this;
	}

	setBody(body) {
		this.body = body;
		return this;
	}

	getBody() {
		return this.body;
	}

	getParameters() {
		const parameters = [];
		this.parameters.forEach((variable, localName) => {
			parameters.push(new ParameterBuilder(variable, localName));
		});
		return parameters;
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
