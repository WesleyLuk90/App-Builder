import StringType from './StringType';
import NumberType from './NumberType';
import ArrayType from './ArrayType';
import BooleanType from './BooleanType';
import ObjectType from './ObjectType';

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
};
