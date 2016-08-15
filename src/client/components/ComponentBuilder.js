import ComponentListBuilder from './ComponentListBuilder';

export default class ComponentBuilder {
	static newBuilder(type) {
		return new ComponentBuilder(type);
	}

	constructor(type) {
		if (typeof type !== 'string') {
			throw new Error('Component type must be a string');
		}
		this.type = type;
		this.components = new Map();
		this.values = new Map();
		this.namedVariables = new Map();
	}

	setComponents(name, componentList) {
		if (!(componentList instanceof ComponentListBuilder)) {
			throw new Error(`ComponentList must be a ComponentListBuilder, got '${componentList}`);
		}
		this.components.set(name, componentList);
		return this;
	}

	setValue(key, value) {
		this.values.set(key, value);
		return this;
	}

	setNamedVariable(key, variable) {
		if (!Array.isArray(variable)) {
			throw new Error(`VariableName must be an array, got ${variable}`);
		}
		this.namedVariables.set(key, variable);
		return this;
	}

	componentsToJSONObject() {
		const components = {};
		this.components
			.forEach((value, key) => {
				components[key] = value.toJSONObject();
			});
		return components;
	}

	valuesToJSONObject() {
		const values = {};
		this.values
			.forEach((value, key) => {
				values[key] = value;
			});
		return values;
	}

	namedVariablesToJSONObject() {
		const namedVariables = {};
		this.namedVariables
			.forEach((value, key) => {
				namedVariables[key] = value;
			});
		return namedVariables;
	}

	toJSONObject() {
		return {
			type: this.type,
			components: this.componentsToJSONObject(),
			values: this.valuesToJSONObject(),
			namedVariables: this.namedVariablesToJSONObject(),
		};
	}
}
