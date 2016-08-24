import React from 'react';

import VariableEditor from './VariableEditor';

export default class ScopedScriptEditor extends React.Component {

	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getLocalVariables() {
		return this.getProgramBuilder().getLocalVariables();
	}

	getScopedProgramBuilders() {
		return this.getProgramBuilder().getScopedProgramBuilders();
	}

	getChildScopeProps(programBuilder) {
		return Object.assign({}, this.props, { programBuilder });
	}

	render() {
		return (<div className="script-editor">
			<button className="button">Add Variable</button>
			<div className="variable-list">
				{this.getLocalVariables().map((variableBuilder, index) => <VariableEditor key={index} variableBuilder={variableBuilder} {...this.props} />)}
			</div>
			<div className="scope-list">
				{this.getScopedProgramBuilders().map((scopedProgramBuilder, index) =>
					<ScopedScriptEditor key={index} {...this.getChildScopeProps(scopedProgramBuilder)} />
				)}
			</div>
		</div>);
	}
}
