import Rx from 'rx';

export default class Variable {
	static createVariable(initialValue) {
		return new Variable(initialValue);
	}

	constructor(initialValue) {
		if (initialValue != null) {
			this.stream = new Rx.BehaviorSubject(initialValue);
		} else {
			this.stream = new Rx.BehaviorSubject(null);
		}
	}

	notifyMutate(value) {
		this.stream.onNext();
	}

	setValue(value) {
		this.stream.onNext(value);
	}

	getValue() {

	}

	getStream() {}

	getDistinctStream() {}

	subscribe(onChange) {}

	bindProperty(property) {
		if (this.binding) {
			throw new Error('Failed to bind to other variable, binding already exists');
		}
		// this.binding = otherVariable.
	}
}
