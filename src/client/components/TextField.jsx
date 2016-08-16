import React from 'react';


import AbstractComponent from './AbstractComponent';

export default class TextField extends AbstractComponent {
	render() {
		// Text fields should not have null or undefined as values if they are going to change later
		let value = this.getValue('value');
		if (value == null) {
			value = '';
		}
		return React.createElement('input', {
			type: 'text',
			placeholder: this.getValue('placeholder'),
			value,
			onChange: (event) => {
				event.preventDefault();
				this.setValue('value', event.target.value);
			},
		});
	}
}
