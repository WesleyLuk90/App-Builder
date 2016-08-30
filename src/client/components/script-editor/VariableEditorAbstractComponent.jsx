import React from 'react';

export default class VariableEditorAbstractComponent extends React.Component {

	getVariableEditorProps(props) {
		if (props) {
			return props;
		}
		return this.props;
	}

	getProgramBuilder(props) {
		return this.getVariableEditorProps(props).programBuilder;
	}

	getModelList(props) {
		return this.getVariableEditorProps(props).modelList;
	}

	getVariableBuilder(props) {
		return this.getVariableEditorProps(props).variableBuilder;
	}

	getEdit(props) {
		return this.getVariableEditorProps(props).edit;
	}

	getVariableEditorState(props) {
		return this.getVariableEditorProps(props).variableEditorState;
	}
}
