import React from 'react';
import _ from 'lodash';

import CodeEditor from './CodeEditor';


export default class ComputedEditor extends React.Component {

	constructor(props) {
		super(props);

		this.id = _.uniqueId();
		this.state = {
			parameters: this.getParameters(),
			selectedVariable: '',
			body: this.getBody(),
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

	getVariable() {
		return this.props.variable;
	}

	getParameters() {
		return this.getVariable().getParameters();
	}

	getBody() {
		return this.getVariable().getComputationBody();
	}

	render() {
		return (<div className="computed-editor">
			<div className="computed-editor__parameter-list">
				{this.state.parameters.map((p, index) =>
					<div className="computed-editor__parameter" key={index}>{p.getLocalName()}</div>
				)}
			</div>
			<div className="computed-editor__variable-parameter-adder">
				<select className="dropdown dropdown--medium-width" onChange={e => this.onChangeVariableSelector(e)} value={this.state.selectedVariable}>
					<option disabled value="">Select a Variable</option>
					<option value="apple">apple</option>
					<option value="orange">orange</option>
					<option value="pear">pear</option>
				</select>
				<button className="button" onClick={e => this.onClickAddParameter(e)}>Add</button>
			</div>
			<div>
				<CodeEditor code={this.state.body} header={this.getHeader()} footer={this.getFooter()} width={700} height={400} onChange={d => console.log(d)} />
			</div>
		</div>);
	}
}
