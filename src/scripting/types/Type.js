export default class Type {
	static isType(typeInstance) {
		return typeInstance instanceof Type;
	}

	isAssignableTo(otherType) {
		return otherType === this || otherType.toJSONObject().type === 'any';
	}

	toJSONObject() {
		throw new Error('Not implemented');
	}

	toString() {
		throw new Error('Not implemented');
	}
}
