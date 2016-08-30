import React from 'react';

import Path from '../../scripting/builder/Path';

export default class AbstractComponent extends React.Component {

	static getName() {
		return this.name;
	}

	getComponentData() {
		return this.props.componentData;
	}

	getScopePath() {
		return this.props.scopePath;
	}

	getProgramScope() {
		return this.props.programScope;
	}

	getValue(key, defaultValue) {
		return this.getComponentData().getValue(this.getProgramScope(), key, defaultValue);
	}

	buildChildComponents(groupName, replaceProps) {
		let childScopePath = this.props.scopePath;
		if (this.getComponentData().hasChildScope(groupName)) {
			childScopePath = this.getComponentData().getChildScopePath(groupName);
		}
		return this.getComponentFactory(replaceProps)
			.withChildScopePath(childScopePath)
			.build(this.getComponentData().getChildComponents(groupName));
	}

	// Check if needed
	getScopeLocalName(groupName) {
		if (!this.getComponentData().hasChildScope(groupName)) {
			throw new Error(`There is no child scope for '${groupName}'`);
		}
		return this.getComponentData().getChildScopePath(groupName).tail();
	}

	getComponentFactory(replaceProps) {
		const props = this.createChildProps(replaceProps);
		return this.props.componentFactory.withProps(props);
	}

	createChildProps(extraProps) {
		return Object.assign({}, this.props, extraProps);
	}

	createProps(props) {
		return Object.assign({}, this.props, props);
	}

	getLoopScope(scopeName, index) {
		return this.props.programScope.getChildScope(scopeName, index);
	}

	setValue(key, value) {
		if (this.getComponentData().hasNamedVariable(key)) {
			const variableName = this.getComponentData().getNamedVariable(key);
			return this.getProgramScope().setValue(variableName, value);
		}
		throw new Error(`Failed to set value, no variable for ${key} exists`);
	}

	subscribeNamedVariables() {
		const ourScope = this.getScopePath();
		this.subscriptions = this.getComponentData().getNamedVariables()
			// Ignore any variables which are not in our scope
			.filter(variableName => !Path.newPath(variableName).getParentPath().isDescendantOf(ourScope))
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
}
