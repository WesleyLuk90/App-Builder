import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';
import ComponentOptionsBuilder from './component-options/ComponentOptionsBuilder';
import AllTypes from '../../scripting/types/AllTypes';

class LabelEditor extends AbstractComponent {

	getComponentOptions() {
		return ComponentOptionsBuilder.create()
			.addOption('label', AllTypes.getStringType())
			.build();
	}

	render() {
		return (<ComponentPlaceholder {...this.createProps()} name="Label" component={this}>
			<label>{this.getDisplayValue('text')}</label>
		</ComponentPlaceholder>);
	}
}

export default class Label extends AbstractComponent {
	static getEditor() {
		return LabelEditor;
	}
	render() {
		return (<div className="label">
			{this.getValue('text')}
		</div>);
	}
}
