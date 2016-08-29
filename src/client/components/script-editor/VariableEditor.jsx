import React from 'react';

import BindingSelector from './BindingSelector';
import ComputedEditor from './ComputedEditor';
import VariableTypes from '../../../scripting/builder/VariableType';

export default class VariableEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			variableType: this.getVariableType(),
		};
	}

	getProgramBuilder() {
		return this.props.programBuilder;
	}

	getVariableType() {
		return this.getVariableBuilder().getVariableType();
	}

	getEdit() {
		return this.props.edit;
	}

	onChangeVariableType(event) {
		event.preventDefault();
		const typeName = event.target.value;
		const variableType = VariableTypes.getByName(typeName);
		this.getEdit().setVariableVariableType(this.getVariableBuilder(), variableType);

		this.setState({ variableType });
	}

	getVariableBuilder() {
		return this.props.variableBuilder;
	}

	render() {
		return (<div className="variable-editor">
			<div className="variable-summary">
				<div className="variable-summary__name">{this.getVariableBuilder().getLocalName()}</div>
				<div className="variable-summary__type">{this.getVariableBuilder().getType().toString()}</div>
				<select className="variable-summary__variable-type dropdown" value={this.state.variableType.name} onChange={e => this.onChangeVariableType(e)}>
					<option value={VariableTypes.NORMAL.name}>{VariableTypes.NORMAL.name}</option>
					<option value={VariableTypes.BOUND.name}>{VariableTypes.BOUND.name}</option>
					<option value={VariableTypes.COMPUTED.name}>{VariableTypes.COMPUTED.name}</option>
				</select>
			</div>
			{this.state.variableType === VariableTypes.BOUND ? <BindingSelector {...this.props} variableBuilder={this.getVariableBuilder()} /> : null}
			{this.state.variableType === VariableTypes.COMPUTED ? <ComputedEditor {...this.props} variableBuilder={this.getVariableBuilder()} /> : null}
		</div>);
	}
}
