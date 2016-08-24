import React from 'react';
import _ from 'lodash';

import AbstractComponent from '../AbstractComponent';

const STATIC_TYPE = 'static';
const VARIABLE_TYPE = 'variable';

export default class ComponentOptionInput extends AbstractComponent {

	constructor(props) {
		super(props);
		this.id = _.uniqueId();

		this.state = {
			valueType: this.getComponentValueType(),
			selectedVariable: '',
		};
	}

	getComponentValueType() {
		const optionName = this.getOption().getName();
		if (this.getComponent().hasNamedVariable(optionName)) {
			return VARIABLE_TYPE;
		}
		return STATIC_TYPE;
	}

	getComponent() {
		return this.props.component;
	}

	changeValueType(event) {
		event.preventDefault();
		this.setState({ valueType: event.target.value });
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
		this.setState({ selectedVariable: name });
	}

	render() {
		const option = this.getOption();
		const variables = this.getAssignableVariables();
		return (<div className="component-option-input">
			<label className="label" htmlFor={this.id}>{this.props.option.getName()}</label>
			<select className="dropdown" id={this.id} value={this.state.valueType} onChange={e => this.changeValueType(e)}>
				<option value={STATIC_TYPE}>Static Value</option>
				<option value={VARIABLE_TYPE}>Variable</option>
			</select>
			{this.state.valueType === STATIC_TYPE ?
				<input type="text" className="text-field" placeholder="Enter a value" />
				:
				null
			}
			{this.state.valueType === VARIABLE_TYPE ?
				<select className="dropdown" value={this.state.selectedVariable} onChange={e => this.onChangeVariableSelect(e)}>
					<option value="" disabled>Select a Variable</option>
					{variables.map((variable, index) =>
						<option key={index} value={variable.getVariablePath().toString()}>
							{variable.getLocalName()}
						</option>
					)}
				</select>
				:
				null
			}
		</div>);
	}
}
