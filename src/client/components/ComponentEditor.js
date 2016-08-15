import React from 'react';

import AbstractComponent from './AbstractComponent';

export default class ComponentEditor extends AbstractComponent {
	constructor(props) {
		super(props);
		this.editorComponentFactory = this.props.ComponentFactory.toEditorComponentFactory();
		this.childProps = Object.assign({},
			this.props, { ComponentFactory: this.editorComponentFactory });
	}

	getComponentFactory() {
		return this.editorComponentFactory.withProps(this.childProps);
	}

	render() {
		const children = this.buildChildComponents('children');
		return React.createElement('div', {}, children);
	}
}
