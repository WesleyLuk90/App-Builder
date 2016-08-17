import StringType from './StringType';
import NumberType from './NumberType';
import BooleanType from './BooleanType';
import ArrayType from './ArrayType';
import ObjectType from './ObjectType';
import AnyArrayType from './AnyArrayType';
import AnyObjectType from './AnyObjectType';

export default {
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
};
