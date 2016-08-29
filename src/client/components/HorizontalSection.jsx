import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';
import AbstractComponentEditor from './AbstractComponentEditor';
import ComponentInfo from './component-editor/ComponentInfo';

class HorizontalSectionEditor extends AbstractComponentEditor {

	static getComponentInfo() {
		return ComponentInfo.create()
			.setBaseComponentName('HorizontalSection')
			.setName('Horizontal Section')
			.setIcon('bars fa-rotate-90');
	}

	render() {
		const children = this.buildChildComponents('children');
		const inserter = this.getComponentInserter('children');
		children.push(inserter);
		return (<ComponentPlaceholder {...this.createPlaceholderProps()}>
			<div className="section-horizontal">{children}</div>
		</ComponentPlaceholder>);
	}
}

export default class HorizontalSection extends AbstractComponent {

	static getEditor() {
		return HorizontalSectionEditor;
	}

	render() {
		const children = this.buildChildComponents('children');
		return React.createElement('div', { className: 'section-horizontal' }, children);
	}
}
