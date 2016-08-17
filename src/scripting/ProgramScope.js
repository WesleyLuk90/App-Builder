import Rx from 'rx';

export default class ProgramScope {
	static create() {
		return new ProgramScope([], null);
	}

	constructor(scopePath, parentScope) {
		this.scopePath = scopePath;
		this.parentScope = parentScope;
		this.variables = new Map();
	}

	matchesScope(scopePath) {
		const myScope = this.scopePath;
		if (myScope.length !== scopePath.length) {
			return false;
		}
		return myScope.every((component, index) => component === scopePath[index]);
	}

	getMatchingScope(scopePath) {
		const parentCount = scopePath.length - this.scopePath.length;
		if (parentCount < 0) {
			throw new Error(`Failed to find matching scope of ${scopePath} from ${this.scopePath}`);
		}
		let scope = this;
		while (parentCount > 0) {
			scope = scope.getParent();
		}
		return scope;
	}

	getParent() {
		return this.parentScope;
	}

	getVariable(name) {
		if (!this.variables.has(name)) {
			this.variables.set(name, new Rx.BehaviorSubject());
		}
		return this.variables.get(name);
	}

	setValue(variableName, value) {
		this.getValueStream(variableName).onNext(value);
	}

	getValue(variableName) {
		return this.getValueStream(variableName).getValue();
	}

	getValueStream(variableName) {
		const name = variableName[variableName.length - 1];
		const path = variableName.slice(0, -1);
		const scope = this.getMatchingScope(path);

		return scope.getVariable(name);
	}
}
