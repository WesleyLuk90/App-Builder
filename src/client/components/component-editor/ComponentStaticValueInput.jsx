import React from 'react';


export default class ComponentStaticValueInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			staticValue: this.getComponentStaticValue(this.props),
		};
	}

	getComponent(props) {
		return props.component;
	}

	loadComponentValue(props) {
		this.setState({ staticValue: this.getComponentStaticValue(props) });
	}

	getOption(props) {
		return props.option;
	}

	getOptionName(props) {
		return this.getOption(props).getName();
	}

	getComponentStaticValue(props) {
		const optionName = this.getOptionName(props);
		return JSON.stringify(this.getComponent(props).getStaticValue(optionName)) || '';
	}

	setStaticValue(value) {
		this.setState({ staticValue: value });
	}

	componentWillReceiveProps(props) {
		this.loadComponentValue(props);
	}

	onChangeStaticValue(e) {
		e.preventDefault();
		this.setStaticValue(e.target.value);
	}

	getValueFromStaticValue() {
		try {
			return JSON.parse(this.state.staticValue);
		} catch (e) {
			return this.state.staticValue;
		}
	}

	onBlurStaticValue() {
		const value = this.getValueFromStaticValue();
		const stringValue = JSON.stringify(value);
		this.setStaticValue(stringValue);
		this.props.edit.setComponentStaticValue(this.props.component, this.props.option, value);
	}

	render() {
		return (<input
			type="text"
			className="text-field"
			placeholder="Enter a value"
			value={this.state.staticValue}
			onChange={e => this.onChangeStaticValue(e)}
			onBlur={() => this.onBlurStaticValue()}
		/>);
	}
}
