import React from 'react';

import InsertComponentContext from './InsertComponentContext';

export default class AbstractComponent extends React.Component {

	getComponentOptions() {
		return [];
	}

	getChildComponents(name) {
		if (!this.props.components) {
			return null;
		}
		return this.props.components[name];
	}

	buildChildComponents(name, replaceProps) {
		return this.getComponentFactory(replaceProps).build(this.getChildComponents(name));
	}

	getComponentFactory(replaceProps) {
		const props = Object.assign({}, this.props, replaceProps);
		return this.props.ComponentFactory.withProps(props);
	}

	getProgramScope() {
		return this.props.ProgramScope;
	}

	createProps(props) {
		return Object.assign({}, this.props, props);
	}

	hasValue(key) {
		return typeof this.props.values[key] !== 'undefined';
	}

	getValue(key, defaultValue) {
		if (this.hasValue(key)) {
			return this.props.values[key];
		}
		if (this.hasNamedVariable(key)) {
			const variableName = this.props.namedVariables[key];
			return this.getProgramScope().getValue(variableName);
		}
		if (arguments.length >= 2) {
			return defaultValue;
		}
		throw new Error(`Attempted to get a not found value '${key}' without providing a default on component ${this.constructor.name}`);
	}

	getLoopScope(scopeName, index) {
		return this.props.ProgramScope.getChildScope(scopeName, index);
	}

	setValue(key, value) {
		if (this.hasNamedVariable(key)) {
			const variableName = this.props.namedVariables[key];
			return this.getProgramScope().setValue(variableName, value);
		}
		throw new Error(`Failed to set value, no variable for ${key} exists`);
	}

	getNamedVariable(key) {
		return this.props.namedVariables[key];
	}

	getScopedVariable(key) {
		return this.props.scopedVariables[key];
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

	getComponentInserter(componentGroup) {
		if (!componentGroup) {
			throw new Error(`ComponentGroup must be defined, got ${componentGroup}`);
		}
		const inserterProps = this.createProps({
			key: 'inserter',
			insertContext: this.getInsertContext(componentGroup),
		});
		// Prevent a circular dependency by fetching it from the component map
		const ComponentInserter = this.props.ComponentMap.getComponent('ComponentInserter');
		return <ComponentInserter {...inserterProps} />;
	}

	getDisplayValue(key) {
		if (this.hasValue(key)) {
			return this.getValue(key);
		}
		if (this.hasNamedVariable(key)) {
			return JSON.stringify(this.props.namedVariables[key]);
		}
		return 'null';
	}

	getInsertContext(componentGroup) {
		return new InsertComponentContext(this, componentGroup);
	}

	componentDidMount() {
		this.subscriptions = this.getNamedVariables()
			.map(variableName => this.getProgramScope().getValueStream(variableName))
			.map(variable => variable.subscribe(() => this.forceUpdate()));
	}

	componentWillUnmount() {
		this.subscriptions.forEach(subscription => subscription.dispose());
	}
}
