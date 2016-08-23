import React from 'react';

export default class ComponentFactory {
	constructor(componentMap) {
		this.componentMap = componentMap;
	}

	toEditorComponentFactory() {
		return new ComponentFactory(this.componentMap.getEditorComponentMap());
	}

	withProps(props) {
		this.props = props;
		return this;
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

	buildComponent(component, index) {
		const componentClass = this.componentMap.getComponent(component.type);
		const props = this.createProps({
			key: index,
			components: component.components,
			values: component.values,
			namedVariables: component.namedVariables,
			scopedVariables: component.scopedVariables,
		});
		return React.createElement(componentClass, props);
	}
}
