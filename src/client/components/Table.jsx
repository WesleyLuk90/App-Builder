import React from 'react';

import AbstractComponent from './AbstractComponent';
import AbstractComponentEditor from './AbstractComponentEditor';
import AllTypes from '../../scripting/types/AllTypes';
import ComponentInfo from './component-editor/ComponentInfo';
import ComponentOption from './component-editor/ComponentOption';
import ComponentOptionsBuilder from './component-editor/ComponentOptionsBuilder';
import ComponentPlaceholder from './ComponentPlaceholder';

class TableEditor extends AbstractComponentEditor {

	static getComponentInfo() {
		return ComponentInfo.create()
			.setBaseComponentName('Table')
			.setName('Table')
			.setIcon('table');
	}

	getComponentOptions() {
		return ComponentOptionsBuilder.create()
			.addOption(ComponentOption.create('foreach', AllTypes.getAnyArrayType()))
			.addOption(ComponentOption.create('as', AllTypes.getAnyType()).inComponentGroupScope('columns'))
			.build();
	}

	render() {
		const headers = this.buildChildComponents('headers');
		headers.push(this.getComponentInserter('headers'));
		const columns = this.buildChildComponents('columns');
		columns.push(this.getComponentInserter('columns'));
		const footers = this.buildChildComponents('footers');
		footers.push(this.getComponentInserter('footers'));
		return (<ComponentPlaceholder {...this.createPlaceholderProps()}>
			<table className="table">
				<thead>
					<tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
				</thead>
				<tbody>
					<tr>{columns.map((c, i) => <td key={i}>{c}</td>)}</tr>
				</tbody>
				<tfoot>
					<tr>{footers.map((f, i) => <th key={i}>{f}</th>)}</tr>
				</tfoot>
			</table>
		</ComponentPlaceholder>);
	}
}

export default class Table extends AbstractComponent {

	static getEditor() {
		return TableEditor;
	}

	render() {
		const forEach = this.getValue('foreach', []);
		const scopeName = this.getValue('scopeName', null);

		const headers = this.buildChildComponents('headers');
		const footers = this.buildChildComponents('footers');
		return (<table className="table">
			<thead>
				<tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
			</thead>
			<tbody>
				{forEach.map((value, rowIndex) => {
					const newScope = this.getLoopScope(scopeName, rowIndex);
					const children = this.buildChildComponents('columns', { programScope: newScope });
					const variableName = this.getComponentData().getNamedVariable('as');
					newScope.setValue(variableName, value);
					return (<tr key={rowIndex}>
						{children.map((child, columnIndex) =>
							<td key={columnIndex}>{child}</td>
						)}
					</tr>);
				})}
			</tbody>
			<tfoot>
				<tr>{footers.map((f, i) => <th key={i}>{f}</th>)}</tr>
			</tfoot>
		</table>);
	}
}
