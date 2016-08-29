export default class ComponentInfo {

	static create() {
		return new ComponentInfo();
	}

	constructor() {
		this.name = 'Unnamed Component';
	}

	setName(name) {
		this.name = name;
		return this;
	}

	setIcon(icon) {
		this.icon = icon;
		return this;
	}

	getName() {
		return this.name;
	}

	hasIcon() {
		return !!this.icon;
	}

	getIcon() {
		return this.icon;
	}

	getIconClass() {
		if (!this.hasIcon()) {
			return '';
		}
		return `fa fa-${this.getIcon()}`;
	}
}
