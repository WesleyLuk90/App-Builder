import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';

class SectionEditor extends AbstractComponent {
	render() {
		const children = this.buildChildComponents('children');
		const inserter = this.getComponentInserter('children');
		children.push(inserter);
		return (<ComponentPlaceholder name="Section" {...this.createProps()}>
			<div className="section">{children}</div>
		</ComponentPlaceholder>);
	}
}

export default class Section extends AbstractComponent {

	static getEditor() {
		return SectionEditor;
	}

	render() {
		const children = this.buildChildComponents('children');
		return React.createElement('div', { className: 'section' }, children);
	}
}
