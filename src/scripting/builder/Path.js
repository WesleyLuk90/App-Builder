export default class Path {

	static rootPath() {
		return new Path([]);
	}

	static newPath(pathComponents) {
		return new Path(pathComponents);
	}

	static isInstance(path) {
		return path instanceof Path;
	}

	constructor(pathComponents) {
		if (!Array.isArray(pathComponents)) {
			throw new Error(`PathComponents must be an array, got ${pathComponents}`);
		}
		this.pathComponents = pathComponents;
	}

	createChild(childName) {
		const newPathComponents = this.pathComponents.slice();
		newPathComponents.push(childName);
		return Path.newPath(newPathComponents);
	}

	equals(otherPath) {
		if (this.pathComponents.length !== otherPath.pathComponents.length) {
			return false;
		}
		return this.pathComponents.every((component, index) => otherPath.pathComponents[index] === component);
	}

	isAncestorOf(otherPath) {
		if (this.pathComponents.length >= otherPath.pathComponents.length) {
			return false;
		}
		return this.pathComponents.every((component, index) => otherPath.pathComponents[index] === component);
	}

	isDescendantOf(otherPath) {
		if (this.pathComponents.length <= otherPath.pathComponents.length) {
			return false;
		}
		return otherPath.pathComponents.every((component, index) => this.pathComponents[index] === component);
	}

	getParentPath() {
		return Path.newPath(this.pathComponents.slice(0, -1));
	}

	getAncestorDistance(otherPath) {
		if (otherPath.equals(this)) {
			return 0;
		}
		if (otherPath.isAncestorOf(this)) {
			return this.getParentPath().getAncestorDistance(otherPath);
		}
		throw new Error(`Can not get ancestor distance, ${otherPath} is not an ancestor of ${this}`);
	}

	tail() {
		return this.pathComponents[this.pathComponents.length - 1];
	}

	toString() {
		return this.pathComponents.join('/');
	}

	toJSONObject() {
		return this.pathComponents.slice();
	}
}
