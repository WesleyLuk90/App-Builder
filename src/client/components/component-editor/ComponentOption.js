export default class ComponentOption {
	constructor(optionName, optionType) {
		this.optionName = optionName;
		this.optionType = optionType;
	}

	getName() {
		return this.optionName;
	}
	getType() {
		return this.optionType;
	}
}
