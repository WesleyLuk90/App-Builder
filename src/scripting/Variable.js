import Rx from 'rx';

import ChangeTokenGenerator from './ChangeTokenGenerator';
import Type from './types/Type';

const STATIC_ARGUMENT = '$$args$$';

function createFunction(parameters, body) {
	const header = parameters.map((p, index) => `const ${p} = ${STATIC_ARGUMENT}[${index}];`).join('\n');
	const fullBody = header + body;

	/* eslint-disable no-new-func */
	const myFunction = new Function(STATIC_ARGUMENT, fullBody);
	/* eslint-enable no-new-func */
	return myFunction;
}

export default class Variable {
	static createVariable(type, initialValue) {
		return new Variable(type, initialValue);
	}

	constructor(type, initialValue) {
		if (!Type.isType(type)) {
			throw new Error(`Variable type must be instance of Type, got '${type}'`);
		}
		this.type = type;
		if (initialValue != null) {
			this.stream = new Rx.BehaviorSubject(initialValue);
		} else {
			this.stream = new Rx.BehaviorSubject(null);
		}
	}

	getType() {
		return this.type;
	}

	notifyChanged(changeToken) {
		this.setValue(this.getValue(), changeToken);
	}

	setValue(value, changeToken) {
		if (this.isNewChange(changeToken)) {
			this.stream.onNext(value);
		}
	}

	isNewChange(changeToken) {
		if (ChangeTokenGenerator.tokensEqual(this.changeToken, changeToken)) {
			return false;
		}
		this.changeToken = changeToken;
		return true;
	}

	getCurrentChangeToken() {
		return this.changeToken;
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
			return aType !== 'object' && bType !== 'object';
		});
	}

	bindProperty(otherVariable, property) {
		if (this.isBound) {
			throw new Error('Failed to bind to other variable, binding already exists');
		}
		otherVariable.getStream().subscribe(newValue => {
			if (!newValue) {
				this.setValue(null, otherVariable.getCurrentChangeToken());
			} else {
				this.setValue(newValue[property], otherVariable.getCurrentChangeToken());
			}
		});
		// If our value changes, update the otherVariable and nofity them
		this.getStream().subscribe((newValue) => {
			const value = otherVariable.getValue();
			if (value) {
				value[property] = newValue;
			}
			otherVariable.notifyChanged(this.getCurrentChangeToken());
		});
	}

	bindComputed(variables, parameters, body) {
		const computation = createFunction(parameters, body);
		const recompute = () => {
			const args = variables.map(v => v.getValue());
			const tokens = variables.map(v => v.getCurrentChangeToken());
			this.setValue(computation(args), tokens);
		};

		variables.forEach(variable => {
			variable.getStream().subscribe(recompute);
		});
	}
}
