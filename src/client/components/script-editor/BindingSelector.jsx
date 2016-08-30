import React from 'react';

import AllTypes from '../../../scripting/types/AllTypes';
import VariableEditorAbstractComponent from './VariableEditorAbstractComponent';

export default class BindingSelector extends VariableEditorAbstractComponent {

	constructor(props) {
		super(props);

		const variable = this.getVariableBuilder();

		this.state = {
			selectedVariableName: variable.getBoundVariablePath(),
			selectedProperty: variable.getBoundProperty(),
		};
	}

	updateVariableBinding(variablePath, property) {
		this.getEdit().setVariableBinding(this.getVariableBuilder(), variablePath.toName(), property);
	}

	getVariableOptions() {
		const programBuilder = this.getProgramBuilder();
		return programBuilder.getVariablesInScope()
			.filter(variable => variable.getType().isAssignableTo(AllTypes.getAnyObjectType()));
	}

	getPropertyOptions() {
		const selectedVariableName = this.state.selectedVariableName;
		const boundVariable = this.getProgramBuilder().getVariableByPath(selectedVariableName);
		if (!boundVariable) {
			return [];
		}
		const objectType = boundVariable.getType();
		const model = this.getModelList().getModel(objectType.getModelName());
		return model.getFieldNames();
	}

	onSelectVariable(event) {
		event.preventDefault();
		this.setState({ selectedVariableName: event.target.value });
		this.updateVariableBinding(this.state.selectedVariableName, event.target.value);
	}

	onSelectProperty(event) {
		event.preventDefault();
		this.setState({ selectedProperty: event.target.value });
		this.updateVariableBinding(this.state.selectedVariableName, event.target.value);
	}

	componentWillReceiveProps(props) {
		const variable = props.variableBuilder;

		this.setState({
			selectedVariableName: variable.getBoundVariablePath(),
			selectedProperty: variable.getBoundProperty(),
		});
	}

	render() {
		return (<div className="binding-selector">
			<dt>Binding</dt>
			<dd>
				<select className="binding-selector__variable dropdown" id={this.id} value={this.state.selectedVariableName.toString()} onChange={e => this.onSelectVariable(e)}>
					<option disabled value="">Select a Variable</option>
					{this.getVariableOptions().map((variable, index) => <option value={variable.getVariablePath().toString()} key={index}>{variable.getVariablePath().toString()}</option>)}
				</select>
				<select className="binding-selector__property dropdown" value={this.state.selectedProperty} onChange={e => this.onSelectProperty(e)}>
					<option disabled value="">Select a Property</option>
					{this.getPropertyOptions().map((option, index) => <option value={option} key={index}>{option}</option>)}
				</select>
			</dd>
		</div>);
	}
}
