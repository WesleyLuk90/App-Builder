import Type from './Type';

let numberType = null;

export default class NumberType extends Type {
	static getInstance() {
		return numberType;
	}

	toJSONObject() {
		return {
			type: 'number',
		};
	}
}

numberType = new NumberType();
