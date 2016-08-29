import Type from './Type';

let booleanType = null;

export default class BooleanType extends Type {
	static getInstance() {
		return booleanType;
	}

	static isTypeData(typeData) {
		return typeData.type === 'boolean';
	}

	static fromData() {
		return BooleanType.getInstance();
	}

	toJSONObject() {
		return {
			type: 'boolean',
		};
	}

	toString() {
		return 'Boolean';
	}
}

booleanType = new BooleanType();
