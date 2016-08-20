import React from 'react';

import VariableEditor from './VariableEditor';

export default class ScriptEditor extends React.Component {

	getVariableNames() {
		return this.props.program.getVariableNames();
	}

	render() {
		return (<div className="script-editor">
			<button className="button">Add Variable</button>
			<div className="variable-list">
				{this.getVariableNames().map((name, index) => <VariableEditor key={index} name={name} {...this.props} />)}
			</div>
			<div className="scope-list">
			</div>
		</div>);
	}
}
