import React from 'react';
import _ from 'lodash';

import AllTypes from '../../../scripting/types/AllTypes';

export default class BindingSelector extends React.Component {
	constructor(props) {
		super(props);

		this.id = _.uniqueId();

		this.state = {
			selectedVariable: '',
			selectedProperty: '',
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

	getProgram() {
		return this.props.program;
	}

	getVariableOptions() {
		const program = this.getProgram();
		return program.getInScopeVariableNames()
			.filter(variableName => program.getVariableFromLocalName(variableName).getType().isAssignableTo(AllTypes.getAnyObjectType()));
	}

	render() {
		this.getVariableOptions();
		return (<div className="variable-binding">
			<label htmlFor={this.id} className="label">Binding:</label>
			<select className="variable-binding dropdown dropdown--medium-width" id={this.id} value={this.state.selectedVariable} onChange={e => this.onSelectVariable(e)}>
				<option disabled value="">Select a Variable</option>
				{this.getVariableOptions().map((option, index) => <option value={option} key={index}>{option}</option>)}
			</select>
			<select className="variable-binding-property dropdown dropdown--medium-width" value={this.state.selectedProperty} onChange={e => this.onSelectProperty(e)}>
				<option disabled value="">Select a Property</option>
			</select>
		</div>);
	}
}
