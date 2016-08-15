import RenderedNode from './RenderedNode';

export default class Renderer {
	static createRenderer(document) {
		return new Renderer(document);
	}

	constructor(document) {
		this.document = document;
		this.renderedNodes = new Map();
	}

	render(documentNode, element) {
		if (!documentNode) {
			throw new Error(`Invalid documentNode ${documentNode}, node must be provided`);
		}
		const domElement = this.createOrUpdate(element);
		documentNode.appendChild(domElement);
	}

	createOrUpdate(element) {
		let renderedNode = null;
		if (this.renderedNodes.has(element)) {
			renderedNode = this.renderedNodes.get(element);
		} else {
			renderedNode = this.create(element);
		}

		renderedNode.syncProps();
		this.updateChildren(renderedNode, element);

		return renderedNode;
	}

	create(element) {
		const node = this.document.createElement(element.getTagName());
		return new RenderedNode(node, element);
	}

	updateChildren(renderedNode, element) {
		let children = element.getChildren();
		if (!children) {
			children = [];
		}
		if (typeof children === 'string') {
			children = [children];
		}
		const renderedChildren = children.map((childElement, index) => {

			this.createOrUpdate(childElement, index)
		});

		renderedNode.syncChildren(renderedChildren);
	}
}