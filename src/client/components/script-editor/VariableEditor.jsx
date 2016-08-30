import React from 'react';

import BindingSelector from './BindingSelector';
import ComputedEditor from './ComputedEditor';
import VariableTypes from '../../../scripting/builder/VariableType';
import VariableNameEditor from './VariableNameEditor';
import VariableEditorAbstractComponent from './VariableEditorAbstractComponent';

export default class VariableEditor extends VariableEditorAbstractComponent {
	constructor(props) {
		super(props);

		this.state = {
			variableType: this.getVariableType(),
		};
	}

	getVariableType() {
		return this.getVariableBuilder().getVariableType();
	}

	onChangeVariableType(event) {
		event.preventDefault();
		const typeName = event.target.value;
		const variableType = VariableTypes.getByName(typeName);
		this.getEdit().setVariableVariableType(this.getVariableBuilder(), variableType);

		this.setState({ variableType });
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

	componentWillReceiveProps(props) {
		this.state = {
			variableType: props.variableBuilder.getVariableType(),
		};
	}

	render() {
		return (<div className="variable-editor">
			<dl className="variable-summary property-list">
				<dt>Variable Name</dt>
				<dd><VariableNameEditor {...this.props} /></dd>
				<dt>Variable Data Type</dt>
				<dd>{this.getVariableBuilder().getType().toString()}</dd>
				<dt>Data Source</dt>
				<dd>
					<select className="variable-summary__variable-type dropdown" value={this.state.variableType.name} onChange={e => this.onChangeVariableType(e)}>
						<option value={VariableTypes.NORMAL.name}>{VariableTypes.NORMAL.name}</option>
						<option value={VariableTypes.BOUND.name}>{VariableTypes.BOUND.name}</option>
						<option value={VariableTypes.COMPUTED.name}>{VariableTypes.COMPUTED.name}</option>
					</select>
				</dd>
				{this.state.variableType === VariableTypes.BOUND ? <BindingSelector {...this.props} variableBuilder={this.getVariableBuilder()} /> : null}
			</dl>
			{this.state.variableType === VariableTypes.COMPUTED ? <ComputedEditor {...this.props} variableBuilder={this.getVariableBuilder()} /> : null}
		</div>);
	}
}
