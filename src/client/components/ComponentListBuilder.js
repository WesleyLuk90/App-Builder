export default class ComponentListBuilder {

	static newBuilder() {
		return new ComponentListBuilder();
	}

	constructor() {
		this.components = [];
	}

	addComponent(builder) {
		this.components.push(builder);
		return this;
	}

	toJSONObject() {
		return this.components.map(component => component.toJSONObject());
	}
}
