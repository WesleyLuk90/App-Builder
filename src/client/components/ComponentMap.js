import Page from './Page';
import Label from './Label';
import TextField from './TextField';
import ComponentEditor from './ComponentEditor';
import { createDefaultComponentEditor } from './DefaultComponentEditor';

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
	}

	addComponent(ctr) {
		this.components.set(ctr.name, ctr);
		if (ctr.getEditor) {
			this.componentEditors.set(ctr.name, ctr.getEditor());
		} else {
			this.componentEditors.set(ctr.name, createDefaultComponentEditor(ctr.name));
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

	getEditorComponentMap() {
		const componentMap = new ComponentMap();
		componentMap.components = this.componentEditors;
		return componentMap;
	}
}
