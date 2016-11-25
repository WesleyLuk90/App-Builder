export default class AnyObjectType {
	static getInstance() {
		if (!AnyObjectType.instance) {
			AnyObjectType.instance = new AnyObjectType();
		}
		return AnyObjectType.instance;
	}

	isAssignableTo(otherType) {
		return otherType === AnyObjectType.getInstance();
	}

	toString() {
		return 'Any Object';
	}

	toJSONObject() {
		return {
			type: 'object',
		};
	}
}
