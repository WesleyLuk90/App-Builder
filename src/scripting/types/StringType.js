import Type from './Type';

let stringType = null;

export default class StringType extends Type {
	static getInstance() {
		return stringType;
	}

	static isTypeData(typeData) {
		return typeData.type === 'string';
	}

	static fromData() {
		return StringType.getInstance();
	}

	toJSONObject() {
		return {
			type: 'string',
		};
	}

	toString() {
		return 'String';
	}

}

stringType = new StringType();
