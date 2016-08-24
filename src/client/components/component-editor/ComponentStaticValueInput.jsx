import React from 'react';

export default class ComponentStaticValueInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			staticValue: this.getComponentStaticValue(),
		};
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

	getComponentStaticValue() {
		const optionName = this.getOptionName();
		return JSON.stringify(this.getComponent().getStaticValue(optionName));
	}

	onChangeStaticValue(e) {
		e.preventDefault();
		this.setStaticValue(e.target.value);
	}

	setStaticValue(value) {
		this.setState({ staticValue: value });
	}

	render() {
		return (<input
			type="text"
			className="text-field"
			placeholder="Enter a value"
			value={this.state.staticValue}
			onChange={e => this.onChangeStaticValue(e)}
		/>);
	}
}
