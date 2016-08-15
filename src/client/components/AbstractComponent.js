import React from 'react';

export default class AbstractComponent extends React.Component {

	getChildComponents(name) {
		if (!this.props.components) {
			return null;
		}
		return this.props.components[name];
	}

	buildChildComponents(name) {
		return this.getComponentFactory().build(this.getChildComponents(name));
	}

	getComponentFactory() {
		return this.props.ComponentFactory.withProps(this.props);
	}

	getVariableList() {
		return this.props.VariableList;
	}

	createProps(props) {
		return Object.assign({}, this.props, props);
	}

	getValue(key, defaultValue) {
		if (typeof this.props.values[key] !== 'undefined') {
			return this.props.values[key];
		}
		if (this.hasNamedVariable(key)) {
			const variableName = this.props.namedVariables[key];
			return this.getVariableList().getValue(variableName);
		}
		if (arguments.length >= 2) {
			return defaultValue;
		}
		throw new Error(`Attempted to get a not found value ${key} without providing a default`);
	}

	setValue(key, value) {
		if (this.hasNamedVariable(key)) {
			const variableName = this.props.namedVariables[key];
			return this.getVariableList().setValue(variableName, value);
		}
		throw new Error(`Failed to set value, no variable for ${key} exists`);
	}

	hasNamedVariable(key) {
		return typeof this.props.namedVariables[key] !== 'undefined';
	}

	getNamedVariables() {
		if (!this.props.namedVariables) {
			return [];
		}
		return Object.keys(this.props.namedVariables)
			.map(key => this.props.namedVariables[key]);
	}

	componentDidMount() {
		this.subscriptions = this.getNamedVariables()
			.map(variableName => this.getVariableList().getValueStream(variableName))
			.map(variable => variable.subscribe(() => this.forceUpdate()));
	}

	componentWillUnmount() {
		this.subscriptions.forEach(subscription => subscription.dispose());
	}
}
