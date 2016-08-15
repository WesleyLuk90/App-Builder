import React from 'react';

import AbstractComponent from './AbstractComponent';

export default class ComponentInserter extends AbstractComponent {
	render() {
		return React.createElement('div', {}, 'Insert a component');
	}
}
