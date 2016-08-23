export default class ComponentOptionsBuilder {
	static create() {
		return new ComponentOptionsBuilder();
	}

	constructor() {
		this.options = new Map();
	}

	addOption(option) {
		this.options.set(option.getName(), option);
		return this;
	}

	build() {
		const options = [];
		this.options.forEach(option => {
			options.push(option);
		});
		return options;
	}
}
