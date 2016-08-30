import React from 'react';
import classnames from 'classnames';

export default class ProgramTree extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: true,
		};
	}
	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getVariables() {
		return this.getProgramBuilder().getLocalVariables();
	}

	getChildScopes() {
		return this.getProgramBuilder().getScopedProgramBuilders();
	}

	onClickToggleExpanded(e) {
		e.preventDefault();
		this.setState({ expanded: !this.state.expanded });
	}

	getVariableIcon(variable) {
		if (variable.isBound()) {
			return <span className="program-tree__icon fa fa-link" />;
		} else if (variable.isComputed()) {
			return <span className="program-tree__icon fa fa-calculator" />;
		}
		return <span className="program-tree__icon fa fa-cube" />;
	}

	getVariableEditorState() {
		return this.props.variableEditorState;
	}

	onClickVariable(e, variable) {
		e.preventDefault();
		this.getVariableEditorState().selectVariable(variable);
	}

	onClickScope(e) {
		e.preventDefault();
		this.getVariableEditorState().selectScope(this.getProgramBuilder());
	}

	componentDidMount() {
		this.subscriptions = [
			this.getVariableEditorState().getSelectedVariableStream().subscribe(() => this.forceUpdate()),
			this.getVariableEditorState().getSelectedScopeStream().subscribe(() => this.forceUpdate()),
		];
	}

	componentWillUnmount() {
		this.subscriptions.forEach(s => s.dispose());
	}

	getChildProps(scope) {
		return Object.assign({}, this.props, { programBuilder: scope });
	}

	getVariableClassName(variable) {
		return classnames('program-tree__item-label', {
			'program-tree__item-label--selected': this.getVariableEditorState().isSelectedVariable(variable),
		});
	}

	getScopeClassName() {
		return classnames('program-tree__item-label', {
			'program-tree__item-label--selected': this.getVariableEditorState().isSelectedScope(this.getProgramBuilder()),
		});
	}

	render() {
		return (<div className="program-tree">
			<div className="program-tree__root">
				<a className="program-tree__icon" onClick={e => this.onClickToggleExpanded(e)}>
					{this.state.expanded ?
						<span className="fa fa-folder-open-o" />
						:
						<span className="fa fa-folder-o" />
					}
				</a>
				<a className={this.getScopeClassName()} onClick={e => this.onClickScope(e)}>
					{this.getProgramBuilder().getScopePath().toString()}
				</a>
			</div>
			<ul className={classnames('program-tree__children', { 'program-tree__children--hidden': !this.state.expanded })}>
				{this.getVariables().map((variable, index) =>
					<li className="program-tree__item" key={index}>
						{this.getVariableIcon(variable)}
						<a className={this.getVariableClassName(variable)} onClick={e => this.onClickVariable(e, variable)}>
							{variable.getLocalName()}
						</a>
					</li>
				)}
				{this.getChildScopes().map((scope, index) =>
					<li className="program-tree__item" key={index}><ProgramTree {...this.getChildProps(scope)} /></li>
				)}
			</ul>
		</div>);
	}
}
