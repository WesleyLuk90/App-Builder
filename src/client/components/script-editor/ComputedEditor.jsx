import React from 'react';
import _ from 'lodash';

import CodeEditor from './CodeEditor';
import VariableEditorAbstractComponent from './VariableEditorAbstractComponent';
import ParameterBuilder from '../../../scripting/builder/ParameterBuilder';


export default class ComputedEditor extends VariableEditorAbstractComponent {

	constructor(props) {
		super(props);

		this.id = _.uniqueId();
		this.state = {
			parameters: this.getParameters(),
			selectedVariable: '',
			body: this.getBody(),
		};
	}

	getParameters() {
		return this.getVariableBuilder().getParameters();
	}

	getBody() {
		return this.getVariableBuilder().getComputationBody();
	}

	getHeader() {
		const params = this.state.parameters.map(p => p.localName).join(', ');
		return `function calculateValue(${params}) {`;
	}

	getFooter() {
		return '}';
	}

	getSelectedVariable() {
		return _.find(this.getVariablesInScope(), v => v.getVariablePath().toString() === this.state.selectedVariable);
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

	updateParameterOptions(parameters) {
		this.getEdit().setComputedVariableParameters(this.getVariableBuilder(), parameters);
		this.setState({ parameters });
	}

	onClickRemoveParameter(e, parameter) {
		e.preventDefault();
		const newParameters = this.state.parameters.filter(p => p !== parameter);
		this.updateParameterOptions(newParameters);
	}

	onChangeCodeEditor(newBody) {
		this.getEdit().setComputedVariableBody(this.getVariableBuilder(), newBody);
	}

	onChangeVariableSelector(e) {
		this.setState({ selectedVariable: e.target.value });
	}

	onClickAddParameter(event) {
		event.preventDefault();

		const selectedVariable = this.getSelectedVariable();
		if (!selectedVariable) {
			return;
		}
		const newParameter = new ParameterBuilder(selectedVariable.getVariablePath(), selectedVariable.getLocalName());
		const newParams = [...this.state.parameters, newParameter];
		this.updateParameterOptions(newParams);
		this.setState({
			selectedVariable: '',
		});
	}

	render() {
		return (<div className="computed-editor">
			<h2>Computation</h2>
			<table className="table computed-editor__parameter-list">
				<thead>
					<tr>
						<th>Variable</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{this.state.parameters.map((p, index) =>
						<tr className="computed-editor__parameter" key={index}>
							<td>{p.getLocalName()}</td>
							<td>
								<a onClick={e => this.onClickRemoveParameter(e, p)}><span className="fa fa-remove" /></a>
							</td>
						</tr>
					)}
				</tbody>
				<tfoot>
					<tr>
						<th colSpan="2">
							<div className="computed-editor__variable-parameter-adder">
								<select className="dropdown dropdown--medium-width" onChange={e => this.onChangeVariableSelector(e)} value={this.state.selectedVariable}>
									<option disabled value="">Select a Variable</option>
									{this.getVariablesInScope().map((v, index) =>
										<option key={index} value={v.getVariablePath().toString()}>{v.getVariablePath().toString()}</option>
									)}
								</select>
								<button className="button" onClick={e => this.onClickAddParameter(e)}>Add</button>
							</div>
						</th>
					</tr>
				</tfoot>
			</table>
			<CodeEditor
				code={this.state.body}
				header={this.getHeader()}
				footer={this.getFooter()}
				width={700}
				height={400}
				onChange={body => this.onChangeCodeEditor(body)}
			/>
		</div>);
	}
}
