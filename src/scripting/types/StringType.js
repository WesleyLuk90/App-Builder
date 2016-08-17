import Type from './Type';

let stringType = null;

export default class StringType extends Type {
	static getInstance() {
		return stringType;
	}

	toJSONObject() {
		return {
			type: 'string',
		};
	}
}

stringType = new StringType();
