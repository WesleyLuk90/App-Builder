import Rx from 'rx';

export default class VariableEditorState {
	constructor() {
		this.variable = new Rx.BehaviorSubject(null);
		this.scope = new Rx.BehaviorSubject(null);
	}

	selectVariable(variable) {
		this.variable.onNext(variable);
		this.scope.onNext(null);
	}

	selectScope(scope) {
		this.variable.onNext(null);
		this.scope.onNext(scope);
	}

	isSelectedVariable(variable) {
		return this.variable.getValue() === variable;
	}

	isSelectedScope(scope) {
		return this.scope.getValue() === scope;
	}

	getSelectedVariable() {
		return this.variable.getValue();
	}

	getSelectedScope() {
		return this.scope.getValue();
	}

	getSelectedVariableStream() {
		return this.variable;
	}

	getSelectedScopeStream() {
		return this.scope;
	}
}
