import React from 'react';
import _ from 'lodash';


import Path from '../../../scripting/builder/Path';

export default class ComponentVariableSelector extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedVariable: '',
		};
	}

	/**
	 * Getters
	 */

	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getOption(props) {
		return props.option;
	}

	getOptionName(props) {
		return this.getOption(props).getName();
	}

	getComponent(props) {
		return props.component;
	}

	getOptionScopePath(props) {
		return this.getComponent(props).getScopePath();
	}

	/**
	 * Computed Getters
	 */

	getComponentVariable(props) {
		const optionName = this.getOptionName(props);
		const variableOptions = this.getAssignableVariables(props);
		const variableName = this.getComponent(props).getNamedVariable(optionName);
		if (!variableName) {
			return null;
		}
		const assignedVariablePath = Path.newPath(variableName);
		const foundVariable = _.find(variableOptions, variable => variable.getVariablePath().equals(assignedVariablePath));
		return foundVariable;
	}

	getAssignableVariables(props) {
		const option = this.getOption(props);
		let variables = null;
		if (option.isInComponentGroupScope()) {
			const name = this.getComponent(props).getScopeLocalName(option.getComponentGroupName());
			const variableScope = this.getOptionScopePath(props).createChild(name);
			variables = this.getProgramBuilder()
				.getScope(variableScope)
				.getLocalVariables();
		} else {
			const scopedProgramBuilder = this.getProgramBuilder()
				.getScope(this.getOptionScopePath(props));
			variables = scopedProgramBuilder.getVariablesInScope();
		}
		return variables
			.filter(variable => variable.getType().isAssignableTo(this.getOption(props).getType()));
	}

	/**
	 * Actions
	 */

	selectVariableByName(name) {
		const variables = this.getAssignableVariables(this.props);
		const foundVariable = _.find(variables, variable => variable.getVariablePath().toString() === name);
		this.selectVariable(foundVariable);
		return foundVariable;
	}

	selectVariable(variableBuilder) {
		if (variableBuilder) {
			this.setState({ selectedVariable: variableBuilder.getVariablePath().toString() });
		} else {
			this.setState({ selectedVariable: '' });
		}
	}

	loadSelectedVariable(props) {
		const componentVariable = this.getComponentVariable(props);
		this.selectVariable(componentVariable);
	}

	/**
	 * Events
	 */

	onChangeVariableSelect(e) {
		e.preventDefault();
		const variable = this.selectVariableByName(e.target.value);
		this.props.edit.setComponentVariableBinding(this.props.component, this.props.option, variable);
	}

	/**
	 * React Hooks
	 */

	componentDidMount() {
		this.loadSelectedVariable(this.props);
	}

	componentWillReceiveProps(props) {
		this.loadSelectedVariable(props);
	}

	render() {
		const variables = this.getAssignableVariables(this.props);
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
