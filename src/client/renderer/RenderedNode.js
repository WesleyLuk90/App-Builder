import PropList from '../elements/utils/PropList';

export default class RenderedNode {
	constructor(node, element) {
		this.element = element;
		this.node = node;
		this.currentProperties = new PropList();
		this.childrenByKey = new Map();
	}

	getChildByKey(key) {
		return this.childrenByKey.get(key);
	}

	setChildByKey(key, renderedNode) {
		this.childrenByKey.set(key, renderedNode);
	}

	syncProps() {
		const currentProperties = this.currentProperties;
		const newProperties = this.element.getProperties();

		const addedProperties = newProperties.subtract(currentProperties);
		const removedProperties = currentProperties.subtract(newProperties);
		const sameProperties = newProperties.intersect(currentProperties);

		addedProperties.forEach((property, value) => {
			this.node[property] = value;
		});

		removedProperties.forEach((property, value) => {
			delete this.node[property];
		});

		sameProperties.forEach((property, value) => {
			const oldValue = value;
			const newValue = this.element.getProperty(property);
			if (oldValue !== newValue) {
				this.node[property] = newValue;
			}
		});
	}
}