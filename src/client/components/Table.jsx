import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentPlaceholder from './ComponentPlaceholder';
import ComponentOptionsBuilder from './component-options/ComponentOptionsBuilder';
import AllTypes from '../../scripting/types/AllTypes';

class TableEditor extends AbstractComponent {
	getComponentOptions() {
		return ComponentOptionsBuilder.create()
			.addOption('foreach', AllTypes.getAnyArrayType())
			.addOption('as', AllTypes.getAnyObjectType())
			.build();
	}

	render() {
		const headers = this.buildChildComponents('headers');
		headers.push(this.getComponentInserter('headers'));
		// const columns = this.buildChildComponents('columns');
		const footers = this.buildChildComponents('footers');
		footers.push(this.getComponentInserter('footers'));
		return (<ComponentPlaceholder {...this.createProps()} name="Table" component={this}>
			<table className="table">
				<thead>
					<tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
				</thead>
				<tbody>
					<tr><td>data</td></tr>
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
		const headers = this.buildChildComponents('headers');
		// const columns = this.buildChildComponents('columns');
		const footers = this.buildChildComponents('footers');
		return (<table className="table">
			<thead>
				<tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
			</thead>
			<tbody>
				<tr><td>data</td></tr>
			</tbody>
			<tfoot>
				<tr>{footers.map((f, i) => <th key={i}>{f}</th>)}</tr>
			</tfoot>
		</table>);
	}
}
