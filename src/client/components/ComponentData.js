import Path from '../../scripting/builder/Path';

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
}
