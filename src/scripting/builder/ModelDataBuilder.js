export default class ModelDataBuilder {
	static newBuilder() {
		return new ModelDataBuilder();
	}

	constructor() {
		this.models = new Map();
	}

	addModel(model) {
		this.models.set(model.getName(), model);
		return this;
	}

	toJSONObject() {
		const models = [];
		this.models.forEach(model => models.push(model));

		return models.map(m => m.toJSONObject());
	}
}
