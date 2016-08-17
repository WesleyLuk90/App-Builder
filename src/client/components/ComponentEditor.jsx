import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentOptionInput from './ComponentOptionInput';

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

		this.state = {
			componentOptions: [],
		};
	}

	isSelected(component) {
		return this.selectedComponent === component;
	}

	selectComponent(component) {
		const lastSelected = this.selectedComponent;
		this.selectedComponent = component;
		this.setState({ componentOptions: component.getComponentOptions() });
		component.forceUpdate();
		if (lastSelected) {
			lastSelected.forceUpdate();
		}
	}

	getComponentFactory() {
		return this.editorComponentFactory.withProps(this.childProps);
	}

	render() {
		console.log(this.state.componentOptions);
		const children = this.buildChildComponents('children');
		return (<div className="component-editor">
			<div className="component-editor__edit-panel">
				{this.state.componentOptions.map((option, index) =>
					<ComponentOptionInput key={index} option={option} />)}
			</div>
			<div className="component-editor__components">
				{children}
			</div>
		</div>);
	}
}
