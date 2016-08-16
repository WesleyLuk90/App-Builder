import Rx from 'rx';

export default class Variable {
	constructor() {
		this.stream = new Rx.BehaviorSubject();
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
	getDistinctStream(){}

	subscribe(onChange) {}
	bindProperty(property) {
		if (this.binding) {
			throw new Error('Failed to bind to other variable, binding already exists');
		}
		this.binding = otherVariable.
	}
}
