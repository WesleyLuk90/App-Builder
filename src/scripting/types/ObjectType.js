import Type from './Type';

const objectTypes = new Map();

export default class ObjectType extends Type {
	static getInstance(modelName) {
		if (Type.isType(modelName)) {
			throw new Error(`Array type must have a base type, got ${modelName}`);
		}
		if (!objectTypes.has(modelName)) {
			objectTypes.set(modelName, new ObjectType(modelName));
		}
		return objectTypes.get(modelName);
	}

	static isTypeData(typeData) {
		return typeData.type === 'object' && typeData.model;
	}

	static fromData(typeData) {
		return ObjectType.getInstance(typeData.model);
	}

	constructor(modelName) {
		super();
		this.modelName = modelName;
	}

	isAssignableTo(otherType) {
		return otherType.toJSONObject().type === 'object';
	}

	toJSONObject() {
		return {
			type: 'object',
			model: this.modelName,
		};
	}
}
