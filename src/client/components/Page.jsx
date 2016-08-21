import React from 'react';

import AbstractComponent from './AbstractComponent';
import AbstractComponentEditor from './AbstractComponentEditor';

class PageEditor extends AbstractComponentEditor {
	render() {
		const children = this.buildChildComponents('children');
		const inserter = this.getComponentInserter('children');
		children.push(inserter);
		return <div className="page">{children}</div>;
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
