import Type from '../../../scripting/types/Type';

export default class ComponentOption {
	static create(optionName, optionType) {
		if (!Type.isType(optionType)) {
			throw new Error(`Invalid type, got ${optionType}`);
		}
		return new ComponentOption(optionName, optionType);
	}

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

	inComponentGroupScope(groupName) {
		this.groupName = groupName;
		return this;
	}
}
