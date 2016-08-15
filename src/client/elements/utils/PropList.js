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

	getPropertyKeys() {
		const propertiesKeys = [];
		this.properties.forEach((value, key) => {
			propertiesKeys.push(key);
		});
		return propertiesKeys;
	}
}