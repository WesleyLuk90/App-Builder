import PropList from '../elements/utils/PropList';

export default class RenderedNode {
	constructor(node, element) {
		this.element = element;
		this.node = node;
		this.currentProperties = new PropList();
	}

	syncProps() {
		const currentProperties = this.currentProperties.getPropertyKeys();
		const newProperties = this.element.getPropertyKeys();

		const addedProperties = this.newProperties.subtract(currentProperties);
		const removedProperties = this.currentProperties.subtract(newProperties);
		const sameProperties = this.newProperties.intersect(this.currentProperties);

		addedProperties.forEach(property => {
			this.node[property] = this.element.getProperty(property);
		});

		removedProperties.forEach(property => {
			delete this.node[property];
		});

		sameProperties.forEach(property => {
			const oldValue = this.currentProperties.getProperty(property);
			const newValue = this.element.getProperty(property);
			if (oldValue !== newValue) {
				this.node[property] = newValue;
			}
		});
	}
}