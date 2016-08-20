import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentOptionEditor from './ComponentOptionEditor';
import ScriptEditor from './script-editor/ScriptEditor';

export default class ComponentEditor extends AbstractComponent {
	constructor(props) {
		super(props);
		this.editorComponentFactory = this.props.componentFactory.toEditorComponentFactory();
		this.childProps = Object.assign({},
			this.props, {
				componentFactory: this.editorComponentFactory,
				componentEditor: this,
			});

		this.state = {
			selectedComponent: null,
		};
	}

	isSelected(component) {
		return this.state.selectedComponent === component;
	}

	selectComponent(component) {
		if (this.isSelected(component)) {
			return;
		}
		const lastSelected = this.state.selectedComponent;
		this.setState({ selectedComponent: component });
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
					<ComponentOptionEditor component={this.state.selectedComponent} />
				</div>
			</div>
			<div className="component-editor__script-panel">
				<ScriptEditor program={this.props.programScope} {...this.props} />
			</div>
		</div>);
	}
}
