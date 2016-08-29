export default class ComponentGroups {
	static findComponentGroupName(components, needleComponent) {
		const componentGroups = Object.keys(components);
		for (const componentGroup of componentGroups) {
			const componentList = components[componentGroup];
			for (let i = 0; i < componentList.length; i++) {
				const component = componentList[i];
				if (component === needleComponent) {
					return componentGroup;
				}
			}
		}
		return null;
	}

	static removeComponentFromList(componentList, component) {
		const index = componentList.indexOf(component);
		componentList.splice(index, 1);
	}
}
