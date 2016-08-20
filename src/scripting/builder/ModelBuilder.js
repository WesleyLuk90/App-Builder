export default class ModelBuilder {
	static newBuilder(name) {
		return new ModelBuilder(name);
	}

	constructor(name) {
		if (typeof name !== 'string') {
			throw new Error(`Name must be instance of string, got '${name}'`);
		}
		this.name = name;
		this.fields = new Map();
	}

	getName(name) {
		return name;
	}

	addField(name, type) {
		this.fields.set(name, type);
		return this;
	}

	fieldsToJSONObject() {
		const fields = [];
		this.fields.forEach((type, name) => {
			fields.push({
				type: type.toJSONObject(),
				name,
			});
		});
		return fields;
	}

	toJSONObject() {
		return {
			name: this.name,
			fields: this.fieldsToJSONObject(),
		};
	}
}
