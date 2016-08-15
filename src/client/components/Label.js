import React from 'react';

import AbstractComponent from './AbstractComponent';


export default class Label extends AbstractComponent {
	render() {
		return React.createElement('label', {}, this.getValue('text'));
	}
}
