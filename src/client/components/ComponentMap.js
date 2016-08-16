import ComponentEditor from './ComponentEditor';
import ComponentInserter from './ComponentInserter';
import Label from './Label';
import Page from './Page';
import Section from './Section';
import Table from './Table';
import TextField from './TextField';
import { createComponentPlaceholder } from './ComponentPlaceholder';

export default class ComponentMap {
	constructor() {
		this.components = new Map();
		this.componentEditors = new Map();
		this.initialize();
	}

	initialize() {
		this.addComponent(Page);
		this.addComponent(Label);
		this.addComponent(TextField);
		this.addComponent(ComponentEditor);
		this.addComponent(Table);
		this.addComponent(ComponentInserter);
		this.addComponent(Section);
	}

	addComponent(ctr) {
		this.components.set(ctr.name, ctr);
		if (ctr.getEditor) {
			this.componentEditors.set(ctr.name, ctr.getEditor());
		} else {
			this.componentEditors.set(ctr.name, createComponentPlaceholder(ctr.name));
		}
	}

	getComponent(componentName) {
		if (typeof componentName !== 'string') {
			throw new Error(`Parameter componentName must be a string, got '${componentName}`);
		}
		if (!this.components.has(componentName)) {
			throw new Error(`Unknown component ${componentName}`);
		}
		return this.components.get(componentName);
	}

	getComponentEditor(componentName) {
		if (!this.componentEditors.has(componentName)) {
			throw new Error(`Unknown component ${componentName}`);
		}
		return this.componentEditors.get(componentName);
	}

	getInsertableComponentNames() {
		const components = [];
		const blacklist = {
			ComponentEditor: true,
			Page: true,
		};
		this.components.forEach((component, name) => {
			if (!blacklist[name]) { components.push(name); }
		});
		return components;
	}

	getEditorComponentMap() {
		const componentMap = new ComponentMap();
		componentMap.components = this.componentEditors;
		return componentMap;
	}
}
