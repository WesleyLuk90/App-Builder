import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentInfo from './component-editor/ComponentInfo';
import InsertComponentContext from './InsertComponentContext';

export default class AbstractComponentEditor extends AbstractComponent {

	static isInsertable() {
		return true;
	}

	static getComponentInfo() {
		return ComponentInfo.create()
			.setName(this.name)
			.setIcon('sticky-note-o');
	}

	getComponentInfo() {
		return this.constructor.getComponentInfo();
	}

	createChildProps(extraProps) {
		const removeComponentCallback = c => this.props.edit.removeComponent(this, c);
		return Object.assign({}, this.props, { onRemoveComponent: removeComponentCallback }, extraProps);
	}

	createPlaceholderProps() {
		return Object.assign({}, this.createProps(), { component: this, componentInfo: this.constructor.getComponentInfo() });
	}

	getName() {
		return this.constructor.name;
	}

	getDisplayValue(key) {
		const data = this.getComponentData();
		if (data.hasStaticValue(key)) {
			return data.getStaticValue(key);
		}
		if (data.hasNamedVariable(key)) {
			return `{${data.getNamedVariable(key)}}`;
		}
		return '{No Binding}';
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

	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getComponentOptions() {
		return [];
	}

	/**
	 * Delete subscriptions
	 * @return {[type]} [description]
	 */
	componentDidMount() {}
	componentWillUnmount() {}

	switchToNamedVariableBinding(option) {
		this.getComponentData().removeStaticValue(option.getName());
		this.forceUpdate();
	}

	switchToStaticValueBinding(option) {
		this.getComponentData().removeNamedVariable(option.getName());
		this.forceUpdate();
	}

	setNamedVariableBinding(option, variableName) {
		this.getComponentData().setNamedVariable(option.getName(), variableName);
		this.forceUpdate();
	}

	setOptionStaticValue(option, value) {
		this.getComponentData().setStaticValue(option, value);
		this.forceUpdate();
	}

	removeChildComponent(child) {
		this.getComponentData().removeChildComponent(child.getComponentData());
		this.forceUpdate();
	}
}
