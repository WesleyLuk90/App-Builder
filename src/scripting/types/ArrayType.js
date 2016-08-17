import Type from './Type';

const arrayTypes = new Map();

export default class ArrayType extends Type {
	static getInstance(baseType) {
		if (Type.isType(baseType)) {
			throw new Error(`Array type must have a base type, got ${baseType}`);
		}
		if (!arrayTypes.has(baseType)) {
			arrayTypes.set(baseType, new ArrayType(baseType));
		}
		return arrayTypes.get(baseType);
	}

	constructor(baseType) {
		super();
		this.baseType = baseType;
	}

	toJSONObject() {
		return {
			type: 'array',
			arrayType: this.baseType.toJSONObject(),
		};
	}
}
