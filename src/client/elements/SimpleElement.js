import BaseElement from './BaseElement';

export default class SimpleElement {
	static createSimpleElementClass(tagName) {
		return class extends BaseElement {
			constructor() {
				super(tagName);
			}
		};
	}
}