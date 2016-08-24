import React from 'react';

import InsertComponentContext from './InsertComponentContext';

export default class AbstractComponent extends React.Component {

	getChildComponents(name) {
		if (!this.props.components) {
			return null;
		}
		return this.props.components[name];
	}

	buildChildComponents(name, replaceProps) {
		return this.getComponentFactory(replaceProps).build(this.getChildComponents(name));
	}

	getScopeLocalName(groupName) {
		if (!this.props.childScopes[groupName]) {
			throw new Error(`There is no child scope for ${groupName}`);
		}
		return this.props.childScopes[groupName];
	}

	getComponentFactory(replaceProps) {
		const props = Object.assign({}, this.props, replaceProps);
		return this.props.componentFactory.withProps(props);
	}

	getProgramScope() {
		return this.props.programScope;
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
		return this.props.programScope.getChildScope(scopeName, index);
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
		const ComponentInserter = this.props.componentMap.getComponent('ComponentInserter');
		return <ComponentInserter {...inserterProps} />;
	}

	getInsertContext(componentGroup) {
		return new InsertComponentContext(this, componentGroup);
	}

	subscribeNamedVariables() {
		this.subscriptions = this.getNamedVariables()
			.map(variableName => this.getProgramScope().getValueStream(variableName))
			.map(variable => variable.subscribe(() => this.forceUpdate()));
	}

	componentDidMount() {
		this.subscribeNamedVariables();
	}

	disposeSubscriptions() {
		this.subscriptions.forEach(subscription => subscription.dispose());
	}

	componentWillUnmount() {
		this.disposeSubscriptions();
	}

	getScopePath() {
		return this.props.scopePath;
	}
}
