import React from 'react';

import VariableEditor from './VariableEditor';

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

	render() {
		return (<div>
			{this.hasSelectedVariable() ?
				<VariableEditor {...this.props} variableBuilder={this.getSelectedVariable()} />
				:
				'nothing'
			}
		</div>);
	}
}
