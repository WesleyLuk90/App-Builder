import AllTypes from '../AllTypes';
import Type from '../Type';

describe('ObjectType', () => {
	it('should be assignable to AnyObjectType', () => {
		expect(AllTypes.getObjectType('someObject').isAssignableTo(AllTypes.getAnyObjectType())).toBe(true);
	});
});

describe('ArrayType', () => {
	it('should be assignable to AnyArrayType', () => {
		expect(AllTypes.getArrayType(AllTypes.getNumberType()).isAssignableTo(AllTypes.getAnyArrayType())).toBe(true);
	});
});


describe('NumberType', () => {
	it('should be an instance of Type', () => {
		expect(Type.isType(AllTypes.getNumberType())).toBe(true);
	});
});
