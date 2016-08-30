import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentEditorProperties from './component-editor/ComponentEditorProperties';
import Edit from './component-editor/Edit';
import ProgramBuilder from '../../scripting/builder/ProgramBuilder';
import ProgramTree from './script-editor/ProgramTree';
import VariableEditorState from './script-editor/VariableEditorState';
import VariableScopeEditor from './script-editor/VariableScopeEditor';
import VerticallyResizablePanel from './VerticallyResizablePanel';

export default class ComponentEditor extends AbstractComponent {
	constructor(props) {
		super(props);

		const program = this.getComponentData().getStaticValue('program');
		this.programBuilder = ProgramBuilder.fromData(program);
		this.editorComponentFactory = this.props.componentFactory.toEditorComponentFactory();
		this.edit = new Edit();

		this.childProps = Object.assign({},
			this.props, {
				componentFactory: this.editorComponentFactory,
				programScope: null, // Null this out to make sure nothing uses it
				programBuilder: this.programBuilder,
				componentEditor: this,
				edit: this.edit,
			});

		this.state = {
			selectedComponent: null,
		};

		this.variableEditorState = new VariableEditorState();
	}

	setSelectedComponent(component) {
		this.setState({ selectedComponent: component });
		component.forceUpdate();
	}

	isSelectedComponent(component) {
		return this.state.selectedComponent === component;
	}

	getComponentFactory() {
		return this.editorComponentFactory.withProps(this.childProps);
	}

	onClickSaveComponent(event) {
		event.preventDefault();
		// console.log(this.props.components.children[0]);
	}

	render() {
		const children = this.buildChildComponents('children');
		const scriptEditorProps = Object.assign({}, this.props, {
			programScope: null,
			programBuilder: this.programBuilder,
			edit: this.edit,
			variableEditorState: this.variableEditorState,
		});
		return (<div className="component-editor">
			<div className="component-editor__actions-panel">
				Some Text Info Here
				<div className="spacer" />
				<button className="button">Another Button</button>
				<button className="button" onClick={() => this.onClickSaveComponent(event)}>Save</button>
			</div>
			<div className="component-editor__middle-row">
				<div className="component-editor__components">
					{children}
				</div>
				<div className="component-editor__edit-panel">
					<ComponentEditorProperties {...scriptEditorProps} component={this.state.selectedComponent} />
				</div>
			</div>
			<VerticallyResizablePanel className="component-editor__script-panel">
				<div className="component-editor__script-panel__variable-list">
					<ProgramTree {...scriptEditorProps} />
				</div>
				<div className="component-editor__script-panel__variable-editor">
					<VariableScopeEditor {...scriptEditorProps} />
				</div>
			</VerticallyResizablePanel>
		</div>);
	}
}
