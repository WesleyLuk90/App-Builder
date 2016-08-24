import React from 'react';
import _ from 'lodash';

import Path from '../../../scripting/builder/Path';

export default class ComponentVariableSelector extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedVariable: '',
		};

		const componentVariable = this.getComponentVariable();
		this.state.selectedVariable = componentVariable.getVariablePath().toString();
	}

	getComponentVariable() {
		const optionName = this.getOptionName();
		const variableOptions = this.getAssignableVariables();
		const assignedVariablePath = Path.newPath(this.getComponent().getNamedVariable(optionName));
		const foundVariable = _.find(variableOptions, variable => variable.getVariablePath().equals(assignedVariablePath));
		return foundVariable;
	}

	getOptionScopePath() {
		return this.props.component.getScopePath();
	}

	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getOption() {
		return this.props.option;
	}

	getOptionName() {
		return this.getOption().getName();
	}

	getComponent() {
		return this.props.component;
	}

	getAssignableVariables() {
		const option = this.getOption();
		let variables = null;
		if (option.isInComponentGroupScope()) {
			const name = this.getComponent().getScopeLocalName(option.getComponentGroupName());
			const variableScope = this.getOptionScopePath().createChild(name);
			variables = this.getProgramBuilder()
				.getScope(variableScope)
				.getLocalVariables();
		} else {
			const scopedProgramBuilder = this.getProgramBuilder()
				.getScope(this.getOptionScopePath());
			variables = scopedProgramBuilder.getVariablesInScope();
		}
		return variables
			.filter(variable => variable.getType().isAssignableTo(this.getOption().getType()));
	}

	onChangeVariableSelect(e) {
		e.preventDefault();
		this.selectVariableByName(e.target.value);
	}

	selectVariableByName(name) {
		const variables = this.getAssignableVariables();
		const foundVariable = _.find(variables, variable => variable.getVariablePath().toString() === name);
		this.selectVariable(foundVariable);
	}

	selectVariable(variableBuilder) {
		this.setState({ selectedVariable: variableBuilder.getVariablePath().toString() });
	}

	render() {
		const variables = this.getAssignableVariables();
		return (<select className="dropdown" value={this.state.selectedVariable} onChange={e => this.onChangeVariableSelect(e)}>
			<option value="" disabled>Select a Variable</option>
			{variables.map((variable, index) =>
				<option key={index} value={variable.getVariablePath().toString()}>
					{variable.getLocalName()}
				</option>
			)}
		</select>);
	}
}
