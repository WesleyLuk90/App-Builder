import ComponentEditor from './ComponentEditor';
import ComponentInserter from './ComponentInserter';
import Text from './Text';
import Page from './Page';
import Section from './Section';
import Table from './Table';
import TextField from './TextField';
import HorizontalSection from './HorizontalSection';

export default class ComponentMap {
	constructor() {
		this.components = new Map();
		this.componentEditors = new Map();
		this.initialize();
	}

	initialize() {
		this.addComponent(Page);
		this.addComponent(Text);
		this.addComponent(TextField);
		this.addComponent(ComponentEditor);
		this.addComponent(Table);
		this.addComponent(ComponentInserter);
		this.addComponent(Section);
		this.addComponent(HorizontalSection);
	}

	addComponent(ctr) {
		this.components.set(ctr.name, ctr);
		if (ctr.getEditor) {
			const editor = ctr.getEditor();
			this.componentEditors.set(ctr.getName(), editor);
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

	getInsertableComponents() {
		const components = [];
		for (const [, component] of this.componentEditors) {
			if (component.isInsertable()) {
				components.push(component);
			}
		}
		return components;
	}

	getEditorComponentMap() {
		const componentMap = new ComponentMap();
		componentMap.components = this.componentEditors;
		return componentMap;
	}
}
