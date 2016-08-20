import React from 'react';

import BindingSelector from './BindingSelector';
import ComputedEditor from './ComputedEditor';

const VariableTypes = {
	NORMAL: { name: 'Normal' },
	BOUND: { name: 'Bound' },
	COMPUTED: { name: 'Computed' },
};

export default class VariableEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			variableType: VariableTypes.NORMAL.name,
		};
	}

	onChangeVariableType(event) {
		event.preventDefault();

		this.setState({ variableType: event.target.value });
	}

	getVariable(name) {
		return this.props.program.getVariableFromLocalName(name);
	}

	render() {
		return (<div className="variable-editor">
			<div className="variable-type">
				<div className="variable-name">{this.props.name}</div>
				<div className="variable-type">Variable Type</div>
				<select className="variable-type dropdown dropdown--medium-width" value={this.state.variableType} onChange={e => this.onChangeVariableType(e)}>
					<option value={VariableTypes.NORMAL.name}>{VariableTypes.NORMAL.name}</option>
					<option value={VariableTypes.BOUND.name}>{VariableTypes.BOUND.name}</option>
					<option value={VariableTypes.COMPUTED.name}>{VariableTypes.COMPUTED.name}</option>
				</select>
			</div>
			{this.state.variableType === VariableTypes.BOUND.name ? <BindingSelector {...this.props} /> : null}
			{this.state.variableType === VariableTypes.COMPUTED.name ? <ComputedEditor {...this.props} /> : null}
		</div>);
	}
}
