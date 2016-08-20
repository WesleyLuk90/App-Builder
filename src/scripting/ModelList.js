import Model from './Model';

export default class ModelList {
	static fromData(data) {
		const modelList = new ModelList();
		modelList.loadData(data);
		return modelList;
	}

	constructor() {
		this.models = new Map();
	}

	loadData(data) {
		data.forEach(model => {
			this.addModel(model.name, Model.fromData(model));
		});
	}

	addModel(name, model) {
		this.models.set(name, model);
	}

	getModel(name) {
		return this.models.get(name);
	}
}
