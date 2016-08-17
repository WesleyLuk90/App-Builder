import Type from './Type';

let booleanType = null;

export default class BooleanType extends Type {
	static getInstance() {
		return booleanType;
	}

	toJSONObject() {
		return {
			type: 'boolean',
		};
	}
}

booleanType = new BooleanType();
