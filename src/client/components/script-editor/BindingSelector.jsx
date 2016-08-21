import React from 'react';
import _ from 'lodash';

import AllTypes from '../../../scripting/types/AllTypes';

export default class BindingSelector extends React.Component {
	constructor(props) {
		super(props);

		this.id = _.uniqueId();

		const variable = this.getVariableBuilder();

		this.state = {
			selectedVariableName: variable.getBoundVariablePath(),
			selectedProperty: variable.getBoundProperty(),
		};
	}

	onSelectVariable(event) {
		event.preventDefault();
		this.setState({ selectedVariableName: event.target.value });
	}

	onSelectProperty(event) {
		event.preventDefault();
		this.setState({ selectedProperty: event.target.value });
	}

	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getModelList() {
		return this.props.modelList;
	}

	getVariableBuilder() {
		return this.props.variableBuilder;
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

	render() {
		return (<div className="variable-binding">
			<label htmlFor={this.id} className="label">Binding:</label>
			<select className="variable-binding dropdown dropdown--medium-width" id={this.id} value={this.state.selectedVariableName.toString()} onChange={e => this.onSelectVariable(e)}>
				<option disabled value="">Select a Variable</option>
				{this.getVariableOptions().map((variable, index) => <option value={variable.getLocalName()} key={index}>{variable.getLocalName()}</option>)}
			</select>
			<select className="variable-binding-property dropdown dropdown--medium-width" value={this.state.selectedProperty} onChange={e => this.onSelectProperty(e)}>
				<option disabled value="">Select a Property</option>
				{this.getPropertyOptions().map((option, index) => <option value={option} key={index}>{option}</option>)}
			</select>
		</div>);
	}
}
