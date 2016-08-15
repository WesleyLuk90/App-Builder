import PropList from './utils/PropList';

export default class BaseElement {
	constructor(tagName) {
		if (!tagName) {
			throw new Error(`Invalid tagName '${tagName}`);
		}
		this.tagName = tagName;
		this.children = null;
		this.properties = new PropList();
	}

	getTagName() {
		return this.tagName;
	}

	setProperty(objectOrKey, value) {
		// Can't be a falsy value
		if (!objectOrKey) {
			throw new Error('Can not setProperty with a null key');
		}

		if (typeof objectOrKey === 'object') {
			const properties = objectOrKey;
			Object.keys(objectOrKey).forEach(key => {
				this.setProperty(key, properties[key]);
			});
		} else if (typeof objectOrKey === 'string') {
			const key = objectOrKey;
			this.properties.setProperty(key, value);
		} else {
			throw new Error(`Invalid parameter type ${typeof objectOrKey}`);
		}
	}

	getProperty(key) {
		return this.properties.getProperty(key);
	}

	setChildren(children) {
		if (!Array.isArray(children)) {
			throw new Error(`Children must be an array, got ${children}`);
		}
		this.children = children;
	}

	getChildren() {
		return this.children;
	}
}