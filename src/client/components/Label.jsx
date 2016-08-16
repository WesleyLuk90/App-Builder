import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';

class LabelEditor extends AbstractComponent {
	render() {
		return (<ComponentPlaceholder {...this.createProps()} name="Label">
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
