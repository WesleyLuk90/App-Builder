import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentInserter from './ComponentInserter';

class PageEditor extends AbstractComponent {
	render() {
		const children = this.buildChildComponents('children');
		children.push(React.createElement(ComponentInserter, { key: 'inserter' }));
		return React.createElement('div', { className: 'page' }, children);
	}
}

export default class Page extends AbstractComponent {

	static getEditor() {
		return PageEditor;
	}

	render() {
		const children = this.buildChildComponents('children');
		return React.createElement('div', { className: 'page' }, children);
	}
}
