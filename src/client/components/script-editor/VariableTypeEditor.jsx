import React from 'react';
import _ from 'lodash';

import VariableEditorAbstractComponent from './VariableEditorAbstractComponent';
import AllTypes from '../../../scripting/types/AllTypes';

export default class VariableTypeEditor extends VariableEditorAbstractComponent {

	constructor(props) {
		super(props);
	}

	getSelectableTypes() {
		return [
			AllTypes.getStringType(),
			AllTypes.getNumberType(),
			AllTypes.getBooleanType(),
			AllTypes.getAnyArrayType(),
			AllTypes.getAnyObjectType(),
			AllTypes.getAnyType(),
		];
	}

	onSelectType(e) {
		const type = e.target.value;
		this.setState({ selectedType: type });
	}

	getSelectedType() {
		const typeName = this.state.selectedType;
		return _.find(this.getSelectableTypes(), type => type.toString() === typeName);
	}

	getObjectSelector() {
		if (this.getSelectedType() !== AllTypes.getAnyObjectType()) {
			return null;
		}
		return (<select value="" className="dropdown variable-type-editor__model-selector">
			<option value="">Any Object Type</option>
		</select>);
	}

	getArrayTypeSelector() {
		if (this.getSelectedType() !== AllTypes.getAnyArrayType()) {
			return null;
		}
		return <VariableTypeEditor {...this.props} />;
	}

	render() {
		return (<div className="variable-type-editor">
			<select className="variable-type-editor__type-selector dropdown" value={this.state.selectedType} onChange={e => this.onSelectType(e)}>
				<option disabled value="">Select a type</option>
				{this.getSelectableTypes().map((type, index) =>
					<option value={type.toString()} key={index}>{type.toString()}</option>
				)}
			</select>
			{this.getObjectSelector()}
			{this.getArrayTypeSelector()}
		</div>);
	}
}
