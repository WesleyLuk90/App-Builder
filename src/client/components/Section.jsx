import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';
import AbstractComponentEditor from './AbstractComponentEditor';
import ComponentInfo from './component-editor/ComponentInfo';

class SectionEditor extends AbstractComponentEditor {

	static getComponentInfo() {
		return ComponentInfo.create()
			.setBaseComponentName('Section')
			.setName('Section')
			.setIcon('bars');
	}

	render() {
		const children = this.buildChildComponents('children');
		const inserter = this.getComponentInserter('children');
		children.push(inserter);
		return (<ComponentPlaceholder name="Section" {...this.createPlaceholderProps()}>
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
