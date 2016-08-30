import Path from '../../scripting/builder/Path';
import ComponentGroups from './ComponentGroups';

export default class ComponentData {
	constructor(componentDefinition) {
		this.componentDefinition = componentDefinition;
	}

	hasNamedVariable(key) {
		return typeof this.componentDefinition.namedVariables[key] !== 'undefined';
	}

	getNamedVariable(key) {
		return this.componentDefinition.namedVariables[key];
	}

	hasStaticValue(key) {
		return typeof this.componentDefinition.values[key] !== 'undefined';
	}

	getStaticValue(key) {
		return this.componentDefinition.values[key];
	}

	hasChildScope(groupName) {
		return !!this.componentDefinition.childScopes[groupName];
	}

	getChildScopePath(groupName) {
		return Path.newPath(this.componentDefinition.childScopes[groupName]);
	}

	getValue(programScope, key, defaultValue) {
		if (this.hasStaticValue(key)) {
			return this.getStaticValue(key);
		}
		if (this.hasNamedVariable(key)) {
			const variableName = this.getNamedVariable(key);
			return programScope.getValue(variableName);
		}
		if (arguments.length >= 2) {
			return defaultValue;
		}
		throw new Error(`Attempted to get a not found value '${key}' without providing a default on component ${this.constructor.name}`);
	}

	getChildComponents(groupName) {
		if (!this.componentDefinition.components) {
			return null;
		}
		return this.componentDefinition.components[groupName];
	}

	getNamedVariables() {
		if (!this.componentDefinition.namedVariables) {
			return [];
		}
		return Object.keys(this.componentDefinition.namedVariables)
			.map(key => this.componentDefinition.namedVariables[key]);
	}

	removeNamedVariable(name) {
		delete this.componentDefinition.namedVariables[name];
	}

	removeStaticValue(name) {
		delete this.componentDefinition.values[name];
	}

	setNamedVariable(name, variableName) {
		this.componentDefinition.namedVariables[name] = variableName;
	}

	setStaticValue(name, value) {
		this.componentDefinition.values[name] = value;
	}

	removeChildComponent(childComponentData) {
		const components = this.componentDefinition.components;
		const targetComponent = childComponentData.componentDefinition;
		const groupName = ComponentGroups.findComponentGroupName(components, targetComponent);
		ComponentGroups.removeComponentFromList(components[groupName], targetComponent);
	}
}
