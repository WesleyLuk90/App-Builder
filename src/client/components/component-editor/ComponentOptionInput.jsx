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
			valueType: STATIC_TYPE,
		};
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

	render() {
		const option = this.getOption();
		const scopedProgramBuilder = this.getProgramBuilder().getScope(this.getOptionScopePath());
		const variables = scopedProgramBuilder.getVariablesInScope()
			.filter(variable => variable.getType().isAssignableTo(this.getOption().getType()));
		console.log(variables);
		return (<div className="component-option-input">
			<label className="label" htmlFor={this.id}>{this.props.option.getName()}</label>
			<select className="dropdown" id={this.id} value={this.state.valueType} onChange={e => this.changeValueType(e)}>
				<option value={STATIC_TYPE}>Static Value</option>
				<option value={VARIABLE_TYPE}>Variable</option>
			</select>
			<div className="option-list">
				{variables.map((variable, index) =>
					<div className="option-list__item" key={index}>{variable.getLocalName()}</div>
				)}
			</div>
		</div>);
	}
}
