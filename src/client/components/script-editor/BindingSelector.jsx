import React from 'react';
import _ from 'lodash';

import AllTypes from '../../../scripting/types/AllTypes';

export default class BindingSelector extends React.Component {
	constructor(props) {
		super(props);

		this.id = _.uniqueId();

		const variable = this.getVariableBuilder();

		this.state = {
			selectedVariable: variable.getBoundVariable(),
			selectedProperty: variable.getBoundProperty(),
		};
	}

	onSelectVariable(event) {
		event.preventDefault();
		this.setState({ selectedVariable: event.target.value });
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
		const variable = this.getProgramBuilder().getVariableFromLocalName(this.state.selectedVariable);
		if (!variable) {
			return [];
		}
		const objectType = variable.getType();
		const model = this.getModelList().getModel(objectType.getModelName());
		return model.getFieldNames();
	}

	render() {
		return (<div className="variable-binding">
			<label htmlFor={this.id} className="label">Binding:</label>
			<select className="variable-binding dropdown dropdown--medium-width" id={this.id} value={this.state.selectedVariable} onChange={e => this.onSelectVariable(e)}>
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
