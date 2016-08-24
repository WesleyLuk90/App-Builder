import Type from './Type';

let anyType = null;

export default class AnyType extends Type {
	static getInstance() {
		return anyType;
	}
	toJSONObject() {
		return {
			type: 'any',
		};
	}
}

anyType = new AnyType();
