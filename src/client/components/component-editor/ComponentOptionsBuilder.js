import Type from '../../../scripting/types/Type';
import ComponentOption from './ComponentOption';

export default class ComponentOptionsBuilder {
	static create() {
		return new ComponentOptionsBuilder();
	}

	constructor() {
		this.options = new Map();
	}

	addOption(name, type) {
		if (!Type.isType(type)) {
			throw new Error(`Invalid type, got ${type}`);
		}
		this.options.set(name, type);
		return this;
	}

	build() {
		const options = [];
		this.options.forEach((type, name) => {
			options.push(new ComponentOption(name, type));
		});
		return options;
	}
}
