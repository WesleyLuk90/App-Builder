import React from 'react';
import _ from 'lodash';

import ComponentStaticValueInput from './ComponentStaticValueInput';
import ComponentVariableSelector from './ComponentVariableSelector';


const STATIC_TYPE = 'static';
const VARIABLE_TYPE = 'variable';

export default class ComponentOptionInput extends React.Component {

	constructor(props) {
		super(props);
		this.id = _.uniqueId();

		this.state = {
			valueType: this.getComponentValueType(this.props),
		};
	}

	loadValueType(props) {
		this.setState({ valueType: this.getComponentValueType(props) });
	}

	getComponentValueType(props) {
		const optionName = this.getOptionName(props);
		if (this.getComponent(props).hasNamedVariable(optionName)) {
			return VARIABLE_TYPE;
		}
		return STATIC_TYPE;
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

	changeValueType(event) {
		event.preventDefault();
		this.setState({ valueType: event.target.value });

		if (event.target.value === STATIC_TYPE) {
			this.props.edit.switchToStaticValueBinding(this.props.component, this.props.option);
		} else if (event.target.value === VARIABLE_TYPE) {
			this.props.edit.switchToNamedVariableBinding(this.props.component, this.props.option);
		}
	}

	componentWillReceiveProps(props) {
		this.loadValueType(props);
	}

	render() {
		return (<div className="component-option-input">
			<label className="label" htmlFor={this.id}>{this.props.option.getName()}</label>
			<select className="dropdown" id={this.id} value={this.state.valueType} onChange={e => this.changeValueType(e)}>
				<option value={STATIC_TYPE}>Static Value</option>
				<option value={VARIABLE_TYPE}>Variable</option>
			</select>
			{this.state.valueType === STATIC_TYPE ?
				<ComponentStaticValueInput {...this.props} /> : null
			}
			{this.state.valueType === VARIABLE_TYPE ?
				<ComponentVariableSelector {...this.props} /> : null
			}
		</div>);
	}
}
