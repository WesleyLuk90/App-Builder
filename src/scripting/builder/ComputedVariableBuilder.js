import ParameterBuilder from './ParameterBuilder';
import Path from './Path';

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
		const variablePath = Path.newPath(variable);
		this.parameters.set(localName, new ParameterBuilder(variablePath, localName));
		return this;
	}

	setParameters(parameters) {
		this.parameters = new Map();
		parameters.forEach(parameter => {
			this.parameters.set(parameter.getLocalName(), parameter);
		});
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
		this.parameters.forEach(parameter => {
			parameters.push(parameter);
		});
		return parameters;
	}

	parametersToJSONObject() {
		const parameters = [];
		this.parameters.forEach(parameter => {
			parameters.push(parameter.toJSONObject());
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
