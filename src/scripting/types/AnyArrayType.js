import ArrayType from './ArrayType';

const anyArrayType = new ArrayType();

export default class AnyArrayType {
	static getInstance() {
		return anyArrayType;
	}
}
