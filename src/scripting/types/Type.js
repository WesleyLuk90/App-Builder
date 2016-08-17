export default class Type {
	static isType(typeInstance) {
		return typeInstance instanceof Type;
	}

	toJSONObject() {
		throw new Error('Not implemented');
	}
}
