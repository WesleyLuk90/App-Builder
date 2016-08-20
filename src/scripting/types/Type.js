export default class Type {
	static isType(typeInstance) {
		return typeInstance instanceof Type;
	}

	isAssignableTo(otherType) {
		return otherType === this;
	}

	toJSONObject() {
		throw new Error('Not implemented');
	}
}
