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

	getVariableBuilder() {
		return this.props.variableBuilder;
	}

	getProgramBuilder() {
		return this.getVariableBuilder().getProgramBuilder();
	}

	getParameters() {
		return this.getVariableBuilder().getParameters();
	}

	getBody() {
		return this.getVariableBuilder().getComputationBody();
	}

	getExistingParameterVariables() {
		const programBuilder = this.getProgramBuilder();
		return this.state.parameters.map(parameter => programBuilder.getParameterVariable(parameter));
	}

	getVariablesInScope() {
		const variables = this.getProgramBuilder().getVariablesInScope();
		const existingParameters = this.getExistingParameterVariables();
		const variableOptions = _(variables)
			.filter(v => v !== this.getVariableBuilder())
			.difference(existingParameters)
			.value();
		return variableOptions;
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
					{this.getVariablesInScope().map((v, index) =>
						<option key={index} value={v.getVariablePath().toString()}>{v.getVariablePath().toString()}</option>
					)}
				</select>
				<button className="button" onClick={e => this.onClickAddParameter(e)}>Add</button>
			</div>
			<div>
				<CodeEditor code={this.state.body} header={this.getHeader()} footer={this.getFooter()} width={700} height={400} onChange={d => console.log(d)} />
			</div>
		</div>);
	}
}
