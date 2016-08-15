export default class PropList {
	constructor() {
		this.properties = new Map();
	}

	getProperty(key) {
		return this.properties.get(key);
	}

	setProperty(key, value) {
		this.properties.set(key, value);
	}

	hasProperty(key) {
		return this.properties.has(key);
	}

	getPropertyKeys() {
		const propertiesKeys = [];
		this.properties.forEach((value, key) => {
			propertiesKeys.push(key);
		});
		return propertiesKeys;
	}

	subtract(otherPropList) {
		const difference = new PropList();
		this.getPropertyKeys()
			.forEach(key => {
				if (!otherPropList.has(key)) {
					difference.setProperty(key, this.getProperty(key));
				}
			});
		return difference;
	}

	intersect(otherPropList) {
		const difference = new PropList();
		this.getPropertyKeys()
			.forEach(key => {
				if (otherPropList.has(key)) {
					difference.setProperty(key, this.getProperty(key));
				}
			});
		return difference;
	}

	forEach(callback) {
		this.properties.forEach(callback);
	}
}