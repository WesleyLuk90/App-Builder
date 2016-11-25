import Type from './Type';

export default class AnyArrayType extends Type {
	static getInstance() {
		if (!AnyArrayType.instance) {
			AnyArrayType.instance = new AnyArrayType();
		}
		return AnyArrayType.instance;
	}

	isAssignableTo(otherType) {
		return otherType instanceof AnyArrayType;
	}

	toString() {
		return 'Array';
	}

	toJSONObject() {
		return {
			type: 'array',
		};
	}
}
