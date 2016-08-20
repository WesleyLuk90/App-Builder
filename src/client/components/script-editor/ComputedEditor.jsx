import React from 'react';
import _ from 'lodash';

import CodeEditor from './CodeEditor';

export default class ComputedEditor extends React.Component {

	constructor(props) {
		super(props);

		this.id = _.uniqueId();
		this.state = {
			parameters: [],
			selectedVariable: '',
		};
	}
	getHeader() {
		const params = this.state.parameters.map(p => p.localName).join(', ');
		return `function(${params}) {`;
	}

	getFooter() {
		return '}';
	}

	onChangeVariableSelector(e) {
		this.setState({ selectedVariable: e.target.value });
	}

	onClickAddParameter(event) {
		event.preventDefault();

		const selectedVariable = this.state.selectedVariable;
		const newParameter = { localName: selectedVariable };
		const newParams = [...this.state.parameters, newParameter];
		this.setState({ parameters: newParams });
	}

	render() {
		return (<div className="computed-editor">
			{this.state.parameters.map(p => p.localName).join(', ')}
			<select className="variable-binding dropdown dropdown--medium-width" onChange={e => this.onChangeVariableSelector(e)} value={this.state.selectedVariable}>
				<option disabled value="">Select a Variable</option>
				<option value="apple">apple</option>
				<option value="orange">orange</option>
				<option value="pear">pear</option>
			</select>
			<button className="button" onClick={e => this.onClickAddParameter(e)}>Add</button>
			<div>
				<CodeEditor code={"\treturn null;"} header={this.getHeader()} footer={this.getFooter()} width={700} height={400} onChange={d => console.log(d)} />
			</div>
		</div>);
	}
}
