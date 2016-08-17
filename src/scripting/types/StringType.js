import Type from './Type';

let stringType = null;

export default class StringType extends Type {
	static getInstance() {
		return stringType;
	}
}

stringType = new StringType();
