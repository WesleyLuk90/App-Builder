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

	notifyChanged() {
		this.setValue(this.getValue());
	}

	setValue(value) {
		this.stream.onNext(value);
	}

	getValue() {
		return this.stream.getValue();
	}

	getStream() {
		return this.stream.distinctUntilChanged(null, (a, b) => {
			if (a !== b) {
				return false;
			}
			const aType = typeof a;
			const bType = typeof b;
			return aType === 'object' || bType === 'object';
		});
	}

	bindProperty(otherVariable, property) {
		if (this.binding) {
			throw new Error('Failed to bind to other variable, binding already exists');
		}
		otherVariable.getStream().subscribe(newValue => {
			if (!newValue) {
				this.setValue(null);
			} else {
				this.setValue(newValue[property]);
			}
		});
		// If our value changes, update the otherVariable and nofity them
		this.getStream().subscribe((newValue) => {
			const value = otherVariable.getValue();
			if (value) {
				value[property] = newValue;
			}
			otherVariable.notifyChanged();
		});
	}
}
