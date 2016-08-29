import AbstractComponent from './AbstractComponent';
import ComponentGroups from './ComponentGroups';
import ComponentInfo from './component-editor/ComponentInfo';

export default class AbstractComponentEditor extends AbstractComponent {

	static isInsertable() {
		return true;
	}

	static getComponentInfo() {
		return ComponentInfo.create()
			.setName(this.name)
			.setIcon('sticky-note-o');
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
		if (this.hasValue(key)) {
			return this.props.values[key];
		}
		if (this.hasNamedVariable(key)) {
			return `{${this.props.namedVariables[key]}}`;
		}
		return '{No Binding}';
	}

	getProgramBuilder() {
		return this.props.programBuilder;
	}
	getComponentOptions() {
		return [];
	}
	componentDidMount() {}
	componentWillUnmount() {}

	switchToNamedVariableBinding(option) {
		delete this.props.values[option.getName()];
		this.forceUpdate();
	}

	switchToStaticValueBinding(option) {
		delete this.props.namedVariables[option.getName()];
		this.forceUpdate();
	}

	setNamedVariableBinding(option, variableName) {
		this.props.namedVariables[option.getName()] = variableName;
		this.forceUpdate();
	}

	setOptionStaticValue(option, value) {
		this.props.values[option.getName()] = value;
		this.forceUpdate();
	}

	removeChildComponent(child) {
		const components = this.props.components;
		const targetComponent = child.props.componentDefinition;
		const groupName = ComponentGroups.findComponentGroupName(components, targetComponent);
		ComponentGroups.removeComponentFromList(components[groupName], targetComponent);
		this.forceUpdate();
	}
}
