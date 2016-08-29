import Type from './Type';

const objectTypes = new Map();

export default class ObjectType extends Type {
	static getInstance(modelName) {
		if (Type.isType(modelName)) {
			throw new Error(`Object type must have a model name, got '${modelName}'`);
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

	getModelName() {
		return this.modelName;
	}

	toJSONObject() {
		return {
			type: 'object',
			model: this.modelName,
		};
	}

	toString() {
		return this.modelName;
	}
}
