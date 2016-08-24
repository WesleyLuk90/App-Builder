import StringType from './StringType';
import NumberType from './NumberType';
import BooleanType from './BooleanType';
import ArrayType from './ArrayType';
import ObjectType from './ObjectType';
import AnyArrayType from './AnyArrayType';
import AnyObjectType from './AnyObjectType';
import AnyType from './AnyType';

const AllTypes = {
	getStringType() {
		return StringType.getInstance();
	},

	getNumberType() {
		return NumberType.getInstance();
	},

	getBooleanType() {
		return BooleanType.getInstance();
	},

	getArrayType(baseType) {
		return ArrayType.getInstance(baseType);
	},

	getObjectType(modelName) {
		return ObjectType.getInstance(modelName);
	},

	getAnyArrayType() {
		return AnyArrayType.getInstance();
	},

	getAnyObjectType() {
		return AnyObjectType.getInstance();
	},

	getAnyType() {
		return AnyType.getInstance();
	},

	getTypeConstructors() {
		return [
			StringType,
			NumberType,
			BooleanType,
			ArrayType,
			ObjectType,
			AnyArrayType,
			AnyObjectType,
		];
	},

	fromData(type) {
		const constructors = AllTypes.getTypeConstructors();
		for (let i = 0; i < constructors.length; i++) {
			if (constructors[i].isTypeData(type)) {
				return constructors[i].fromData(type);
			}
		}
		throw new Error(`Invalid type data ${type}`);
	},
};

export default AllTypes;
