import React from 'react';

import AbstractComponent from './AbstractComponent';

export default class Table extends AbstractComponent {
	render() {
		const headers = this.buildChildComponents('headers');
		// const columns = this.buildChildComponents('columns');
		const footers = this.buildChildComponents('footers');
		return React.createElement('table', { className: 'table' },
			React.createElement('thead', {},
				React.createElement('tr', {}, headers.map((h, i) => React.createElement('th', { key: i }, h)))
			),
			React.createElement('tbody', {},
				React.createElement('tr', {}, React.createElement('td'))
			),
			React.createElement('tfoot', {},
				React.createElement('tr', {}, footers.map((f, i) => React.createElement('th', { key: i }, f)))
			)
		);
	}
}
