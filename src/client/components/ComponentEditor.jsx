import React from 'react';

import AbstractComponent from './AbstractComponent';

export default class ComponentEditor extends AbstractComponent {
	constructor(props) {
		super(props);
		this.editorComponentFactory = this.props.ComponentFactory.toEditorComponentFactory();
		this.childProps = Object.assign({},
			this.props, {
				ComponentFactory: this.editorComponentFactory,
				ComponentEditor: this,
			});

		this.selectedComponent = null;
	}

	isSelected(component) {
		return this.selectedComponent === component;
	}

	selectComponent(component) {
		const lastSelected = this.selectedComponent;
		this.selectedComponent = component;
		component.forceUpdate();
		if (lastSelected) {
			lastSelected.forceUpdate();
		}
	}

	getComponentFactory() {
		return this.editorComponentFactory.withProps(this.childProps);
	}

	render() {
		const children = this.buildChildComponents('children');
		return (<div className="component-editor">
			<div className="component-editor__edit-panel">
				Things go here
			</div>
			<div className="component-editor__components">
				{children}
			</div>
		</div>);
	}
}
