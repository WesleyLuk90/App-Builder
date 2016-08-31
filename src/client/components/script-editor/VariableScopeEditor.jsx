import React from 'react';

import VariableEditor from './VariableEditor';
import ScopeEditor from './ScopeEditor';

export default class VariableScopeEditor extends React.Component {
	getVariableEditorState() {
		return this.props.variableEditorState;
	}

	hasSelectedVariable() {
		return !!this.getSelectedVariable();
	}

	getSelectedVariable() {
		return this.getVariableEditorState().getSelectedVariable();
	}

	hasSelectedScope() {
		return !!this.getSelectedScope();
	}

	getSelectedScope() {
		return this.getVariableEditorState().getSelectedScope();
	}

	componentDidMount() {
		this.subscriptions = [
			this.getVariableEditorState().getSelectedVariableStream().subscribe(() => this.forceUpdate()),
			this.getVariableEditorState().getSelectedScopeStream().subscribe(() => this.forceUpdate()),
		];
	}

	componentWillUnmount() {
		this.subscriptions
			.forEach(s => s.dispose());
	}

	getVariableEditor() {
		if (this.hasSelectedVariable()) {
			return <VariableEditor {...this.props} variableBuilder={this.getSelectedVariable()} />;
		}
		return null;
	}

	getScopeEditor() {
		if (this.hasSelectedScope()) {
			return <ScopeEditor {...this.props} scope={this.getSelectedScope()} />;
		}
		return null;
	}

	getDefaultMessage() {
		if (!this.hasSelectedVariable() && !this.hasSelectedScope()) {
			return 'Select an item from the left';
		}
		return null;
	}

	render() {
		return (<div>
			{this.getVariableEditor()}
			{this.getScopeEditor()}
			{this.getDefaultMessage()}
		</div>);
	}
}
