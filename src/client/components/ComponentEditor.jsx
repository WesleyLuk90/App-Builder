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

	getComponentData() {
		console.log(this.props.components.children[0]);
	}

	render() {
		const children = this.buildChildComponents('children');
		return (<div className="component-editor">
			<div className="component-editor__actions-panel">
				Some Text Info Here
				<div className="spacer" />
				<button className="button">Another Button</button>
				<button className="button" onClick={() => this.getComponentData()}>Save</button>
			</div>
			<div className="component-editor__middle-row">
				<div className="component-editor__components">
					{children}
				</div>
				<div className="component-editor__edit-panel">
					{this.state.componentOptions.map((option, index) =>
						<ComponentOptionInput key={index} option={option} />)}
				</div>
			</div>
			<div className="component-editor__script-panel">
			</div>
		</div>);
	}
}
