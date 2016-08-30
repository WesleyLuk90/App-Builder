import React from 'react';

import VariableEditorAbstractComponent from './VariableEditorAbstractComponent';

export default class VariableNameEditor extends VariableEditorAbstractComponent {

	constructor(props) {
		super(props);

		this.state = {
			editing: false,
			name: this.getVariableBuilder().getLocalName(),
		};
	}

	onClickEdit(e) {
		e.preventDefault();
		this.setState({ editing: true });
	}

	onClickConfirm(e) {
		e.preventDefault();
		// TODO: validation
		this.getEdit().renameVariable(this.getVariableBuilder(), this.state.name);
		this.setState({ editing: false });
	}

	onClickCancel(e) {
		e.preventDefault();
		this.setState({
			name: this.getVariableBuilder().getLocalName(),
			editing: false,
		});
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			editing: false,
			name: this.getVariableBuilder(props).getLocalName(),
		});
	}

	render() {
		return (<div className="variable-name-editor">
			<input type="text" className="variable-name-editor__input_field text-field" disabled={!this.state.editing} value={this.state.name} onChange={e => this.onChangeName(e)} />
			{this.state.editing ?
				<span>
					<a onClick={e => this.onClickConfirm(e)}><span className="fa fa-check" /></a>
					<a onClick={e => this.onClickCancel(e)}><span className="fa fa-ban" /></a>
				</span>
				:
				<a onClick={e => this.onClickEdit(e)}><span className="fa fa-pencil" /></a>
			}
		</div>);
	}
}
