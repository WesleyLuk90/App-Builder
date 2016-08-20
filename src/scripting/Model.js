import AllTypes from './types/AllTypes';

export default class Model {
	static fromData(data) {
		const model = new Model(data.name);
		model.loadData(data);
		return model;
	}

	constructor(name) {
		if (typeof name !== 'string') {
			throw new Error(`Model name must be a string, got ${name}`);
		}
		this.name = name;
		this.fields = new Map();
	}

	loadData(data) {
		data.fields.forEach(field => {
			this.fields.set(field.name, AllTypes.fromData(field.type));
		});
	}

	getFieldNames() {
		const fieldNames = [];
		this.fields.forEach((type, fieldName) => {
			fieldNames.push(fieldName);
		});
		return fieldNames;
	}
}
