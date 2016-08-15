import React from 'react';

import AbstractComponent from './AbstractComponent';

export function createDefaultComponentEditor(name) {
	return class DefaultComponentEditor extends AbstractComponent {
		render() {
			return React.createElement('div', { className: 'default-component-editor' }, name);
		}
	};
}
