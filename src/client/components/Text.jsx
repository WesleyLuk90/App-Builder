import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';
import ComponentOptionsBuilder from './component-options/ComponentOptionsBuilder';
import AllTypes from '../../scripting/types/AllTypes';

class TextEditor extends AbstractComponent {

	getComponentOptions() {
		return ComponentOptionsBuilder.create()
			.addOption('text', AllTypes.getStringType())
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
