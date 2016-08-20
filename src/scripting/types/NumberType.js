import Type from './Type';

let numberType = null;

export default class NumberType extends Type {
	static getInstance() {
		return numberType;
	}

	static isTypeData(typeData) {
		return typeData.type === 'number';
	}

	static fromData() {
		return NumberType.getInstance();
	}

	toJSONObject() {
		return {
			type: 'number',
		};
	}
}

numberType = new NumberType();
