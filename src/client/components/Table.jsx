import React from 'react';

import AbstractComponent from './AbstractComponent';

class TableEditor extends AbstractComponent {
	render() {
		const headers = this.buildChildComponents('headers');
		headers.push(this.getComponentInserter('headers'));
		// const columns = this.buildChildComponents('columns');
		const footers = this.buildChildComponents('footers');
		footers.push(this.getComponentInserter('headers'));
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
