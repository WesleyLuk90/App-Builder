import React from 'react';

import AbstractComponent from './AbstractComponent';
import AbstractComponentEditor from './AbstractComponentEditor';
import AllTypes from '../../scripting/types/AllTypes';
import ComponentOption from './component-editor/ComponentOption';
import ComponentOptionsBuilder from './component-editor/ComponentOptionsBuilder';
import ComponentPlaceholder from './ComponentPlaceholder';

class TextEditor extends AbstractComponentEditor {

	getComponentOptions() {
		return ComponentOptionsBuilder.create()
			.addOption(ComponentOption.create('text', AllTypes.getStringType()))
			.build();
	}

	render() {
		return (<ComponentPlaceholder {...this.createProps()} name="Text" component={this}>
			<div>{this.getDisplayValue('text')}</div>
		</ComponentPlaceholder>);
	}
}

export default class Text extends AbstractComponent {
	static getEditor() {
		return TextEditor;
	}
	render() {
		return (<div className="text">
			{this.getValue('text')}
		</div>);
	}
}
