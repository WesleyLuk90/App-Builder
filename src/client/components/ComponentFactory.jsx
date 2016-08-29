import React from 'react';

import Path from '../../scripting/builder/Path';

export default class ComponentFactory {
	static createFromComponentMap(componentMap) {
		return new ComponentFactory(componentMap, {});
	}

	constructor(componentMap, props) {
		this.componentMap = componentMap;
		this.props = props;
		this.scopePath = Path.rootPath();
	}

	toEditorComponentFactory() {
		return new ComponentFactory(this.componentMap.getEditorComponentMap());
	}

	withProps(props) {
		return new ComponentFactory(this.componentMap, props);
	}

	withChildScopePath(scopePath) {
		const newComponentFactory = new ComponentFactory(this.componentMap, this.props);
		if (!Path.isInstance(scopePath)) {
			throw new Error(`ScopePath must be a path, got ${scopePath}`);
		}
		newComponentFactory.scopePath = scopePath;
		return newComponentFactory;
	}

	build(componentList) {
		if (!componentList) {
			return [];
		}
		if (typeof componentList === 'string') {
			return [componentList];
		}
		return componentList.map((component, index) => this.buildComponent(component, index));
	}

	createProps(props) {
		return Object.assign({}, this.props, props);
	}

	getScopePath() {
		return this.scopePath;
	}

	buildComponent(component, index) {
		const componentClass = this.componentMap.getComponent(component.type);
		const props = this.createProps({
			key: index,
			components: component.components,
			values: component.values,
			namedVariables: component.namedVariables,
			childScopes: component.childScopes,
			componentDefinition: component,
			scopePath: this.getScopePath(),
		});
		if (this.props.programBuilder) {
			props.programBuilder = this.props.programBuilder.getScope(this.getScopePath());
		}
		return React.createElement(componentClass, props);
	}
}
