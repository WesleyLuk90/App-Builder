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
		this.updateChildren(element);

		return renderedNode;
	}

	create(element) {
		const node = this.document.createElement(element.getTagName());
		return new RenderedNode(node, element);
	}

	updateChildren(renderedNode, element) {
		const children = element.getChildren();
		const renderedChildren = children.map(childElement => this.createOrUpdate(childElement));

		renderedNode.syncChildren(renderedChildren);
	}
}