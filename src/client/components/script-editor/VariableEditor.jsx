import React from 'react';

import BindingSelector from './BindingSelector';
import ComputedEditor from './ComputedEditor';
import VariableTypes from '../../../scripting/builder/VariableType';

export default class VariableEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			variableType: this.getVariableType(),
		};
	}

	getVariableName() {
		return this.props.name;
	}

	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getVariableType() {
		const programBuilder = this.getProgramBuilder();
		const name = this.getVariableName();
		return programBuilder.getVariableType(name);
	}

	getEdit() {
		return this.props.edit;
	}

	onChangeVariableType(event) {
		event.preventDefault();
		const typeName = event.target.value;
		const variableType = VariableTypes.getByName(typeName);
		this.getEdit().setVariableType(this.getVariable(), variableType);

		this.setState({ variableType });
	}

	getVariable() {
		return this.getProgramBuilder().getVariableByName(this.getVariableName());
	}

	render() {
		return (<div className="variable-editor">
			<div className="variable-type">
				<div className="variable-name">{this.props.name}</div>
				<div className="variable-type">Variable Type</div>
				<select className="variable-type dropdown dropdown--medium-width" value={this.state.variableType.name} onChange={e => this.onChangeVariableType(e)}>
					<option value={VariableTypes.NORMAL.name}>{VariableTypes.NORMAL.name}</option>
					<option value={VariableTypes.BOUND.name}>{VariableTypes.BOUND.name}</option>
					<option value={VariableTypes.COMPUTED.name}>{VariableTypes.COMPUTED.name}</option>
				</select>
			</div>
			{this.state.variableType === VariableTypes.BOUND ? <BindingSelector {...this.props} variable={this.getVariable()} /> : null}
			{this.state.variableType === VariableTypes.COMPUTED ? <ComputedEditor {...this.props} variable={this.getVariable()} /> : null}
		</div>);
	}
}
