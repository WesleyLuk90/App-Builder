import Type from './Type';

import AnyArrayType from './AnyArrayType';

const arrayTypes = new Map();

export default class ArrayType extends AnyArrayType {
	static getInstance(baseType) {
		if (!Type.isType(baseType)) {
			throw new Error(`Array type must have a base type, got ${baseType && baseType.constructor.name}`);
		}
		if (!arrayTypes.has(baseType)) {
			arrayTypes.set(baseType, new ArrayType(baseType));
		}
		return arrayTypes.get(baseType);
	}

	static isTypeData(typeData) {
		return typeData.type === 'array' && typeData.arrayType;
	}

	static fromData(typeData) {
		return ArrayType.getInstance(typeData.arrayType);
	}

	constructor(baseType) {
		super();
		this.baseType = baseType;
	}

	isAssignableTo(otherType) {
		if (super.isAssignableTo(otherType)) {
			return true;
		}
		return otherType.toJSONObject().type === 'array';
	}

	toJSONObject() {
		return {
			type: 'array',
			arrayType: this.baseType ? this.baseType.toJSONObject() : null,
		};
	}

	toString() {
		return `Array of ${this.baseType.toString()}`;
	}
}
