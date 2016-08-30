import React from 'react';

import VariableEditor from './VariableEditor';
import ProgramTree from './ProgramTree';

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

	hasChildrenScopes() {
		return this.getScopedProgramBuilders().length > 0;
	}

	getChildScopeProps(programBuilder) {
		return Object.assign({}, this.props, { programBuilder });
	}

	render() {
		return (<div className="script-editor">
			<div className="script-editor__header">
				<h2><a><span className="fa fa-plus-square-o" /> Scope {this.getProgramBuilder().getScopePath().toString()}</a></h2>
				<button className="button">Add Variable</button>
			</div>
			<div className="script-editor__scope">
				<h3>Variables</h3>
				<div className="variable-list">
					<div className="variable-list__header">
						<div className="variable-list__header__name">Variable</div>
						<div className="variable-list__header__type">Data Type</div>
						<div className="variable-list__header__variable-type">Data Source</div>
					</div>
					{this.getLocalVariables().map((variableBuilder, index) => <VariableEditor key={index} variableBuilder={variableBuilder} {...this.props} />)}
				</div>
				{this.hasChildrenScopes() ?
					<div>
						<h3>Child Scopes</h3>
						<div className="scope-list">
							{this.getScopedProgramBuilders().map((scopedProgramBuilder, index) =>
								<ScopedScriptEditor key={index} {...this.getChildScopeProps(scopedProgramBuilder)} />
							)}
						</div>
					</div>
					:
					null
				}
			</div>
		</div>);
	}
}
