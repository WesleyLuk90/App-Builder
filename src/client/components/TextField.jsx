import React from 'react';
import _ from 'lodash';

import AbstractComponent from './AbstractComponent';
import AbstractComponentEditor from './AbstractComponentEditor';
import ComponentPlaceholder from './ComponentPlaceholder';
import ComponentOptionsBuilder from './component-options/ComponentOptionsBuilder';
import AllTypes from '../../scripting/types/AllTypes';

export class TextFieldEditor extends AbstractComponentEditor {

	constructor(props) {
		super(props);
		this.id = _.uniqueId();
	}

	getComponentOptions() {
		return ComponentOptionsBuilder.create()
			.addOption('label', AllTypes.getStringType())
			.addOption('placeholder', AllTypes.getStringType())
			.addOption('value', AllTypes.getStringType())
			.build();
	}

	render() {
		return (<ComponentPlaceholder {...this.createProps()} name="Text Field" component={this}>
			<label htmlFor={this.id}>{this.getDisplayValue('label', '')}</label>
			<input
				id={this.id}
				className="text-field"
				disabled
				placeholder={this.getDisplayValue('placeholder')}
			/>
		</ComponentPlaceholder>);
	}
}

export default class TextField extends AbstractComponent {

	constructor(props) {
		super(props);
		this.id = _.uniqueId();
	}

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
		return (<div>
			<label htmlFor={this.id}>{this.getValue('label', '')}</label>
			<input
				id={this.id}
				type="text"
				className="text-field"
				placeholder={this.getValue('placeholder')}
				value={value}
				onChange={e => this.onChangeInput(e)}
			/>
		</div>);
	}
}
