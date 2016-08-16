import ComponentBuilder from './ComponentBuilder';

export default class InsertComponentContext {
	constructor(component, componentGroup) {
		this.component = component;
		this.componentGroup = componentGroup;
	}

	getComponentGroup() {
		const group = this.component.props.components[this.componentGroup] || [];
		this.component.props.components[this.componentGroup] = group;
		return group;
	}

	insertComponentByName(name) {
		const builtComponent = ComponentBuilder.newBuilder(name).toJSONObject();
		const componentGroup = this.getComponentGroup();
		componentGroup.push(builtComponent);
		this.component.forceUpdate();
	}
}
