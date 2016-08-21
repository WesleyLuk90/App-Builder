import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentOptionEditor from './ComponentOptionEditor';
import ScopedScriptEditor from './script-editor/ScopedScriptEditor';
import ProgramBuilder from '../../scripting/builder/ProgramBuilder';
import Edit from './component-editor/Edit';

export default class ComponentEditor extends AbstractComponent {
	constructor(props) {
		super(props);

		this.editorComponentFactory = this.props.componentFactory.toEditorComponentFactory();

		const program = this.getValue('program');
		this.programBuilder = ProgramBuilder.fromData(program);

		this.edit = new Edit();

		this.childProps = Object.assign({},
			this.props, {
				componentFactory: this.editorComponentFactory,
				componentEditor: this,
				programScope: null, // Null this out to make sure nothing uses it
				programBuilder: this.programBuilder,
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
		console.log(this.childProps);
		return this.editorComponentFactory.withProps(this.childProps);
	}

	getComponentData() {
		console.log(this.props.components.children[0]);
	}

	render() {
		const children = this.buildChildComponents('children');
		const scriptEditorProps = Object.assign({}, this.props, {
			programScope: null,
			programBuilder: this.programBuilder,
			edit: this.edit,
		});
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
				<ScopedScriptEditor program={this.props.programScope} {...scriptEditorProps} />
			</div>
		</div>);
	}
}
