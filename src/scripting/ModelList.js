export default class ModelList {
	static fromData(data) {
		const modelList = new ModelList();
		return modelList;
	}

	constructor() {

	}

	loadData(data) {
		this.data = data;
	}
}
