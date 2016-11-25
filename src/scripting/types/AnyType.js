import Type from './Type';

export default class AnyType extends Type {
	static getInstance() {
		if (!AnyType.instance) {
			AnyType.instance = new AnyType();
		}
		return AnyType.instance;
	}

	isAssignableTo(otherType) {
		return otherType instanceof AnyType;
	}

	toString() {
		return 'Any';
	}

	toJSONObject() {
		return {
			type: 'any',
		};
	}
}
