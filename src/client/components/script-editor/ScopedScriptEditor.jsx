import React from 'react';

import VariableEditor from './VariableEditor';

export default class ScopedScriptEditor extends React.Component {

	getLocalVariables() {
		return this.props.programBuilder.getLocalVariables();
	}

	render() {
		return (<div className="script-editor">
			<button className="button">Add Variable</button>
			<div className="variable-list">
				{this.getLocalVariables().map((variableBuilder, index) => <VariableEditor key={index} variableBuilder={variableBuilder} {...this.props} />)}
			</div>
			<div className="scope-list">
			</div>
		</div>);
	}
}
