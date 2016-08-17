import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';
import ComponentOptionsBuilder from './component-options/ComponentOptionsBuilder';
import AllTypes from '../../scripting/types/AllTypes';

export class TextFieldEditor extends AbstractComponent {

	getComponentOptions() {
		return ComponentOptionsBuilder.create()
			.addOption('placeholder', AllTypes.getStringType())
			.addOption('value', AllTypes.getStringType())
			.build();
	}

	render() {
		return (<ComponentPlaceholder {...this.createProps()} name="Text Field" component={this}>
			<input
				className="text-field"
				disabled
				placeholder={this.getDisplayValue('placeholder')}
			/>
		</ComponentPlaceholder>);
	}
}

export default class TextField extends AbstractComponent {

	static getEditor() {
		return TextFieldEditor;
	}

	onChangeInput(event) {
		event.preventDefault();
		this.setValue('value', event.target.value);
	}

	render() {
		// Text fields should not have null or undefined as values if they are going to change later
		let value = this.getValue('value');
		if (value == null) {
			value = '';
		}
		return (<input
			type="text"
			className="text-field"
			placeholder={this.getValue('placeholder')}
			value={value}
			onChange={e => this.onChangeInput(e)}
		/>);
	}
}
