import React from 'react';
import classnames from 'classnames';

import AbstractComponent from './AbstractComponent';

export default class ComponentInserterModal extends AbstractComponent {
	getInsertableComponents() {
		return this.props.ComponentMap.getComponentNames()
			.map((componentName, index) =>
				(<li key={index}>
					<a>{componentName}</a>
				</li>)
			);
	}

	backgroundClass() {
		return classnames('component-inserter-modal__background', {
			'component-inserter-modal__background--shown': this.props.shown,
		});
	}

	render() {
		return (<div className="component-inserter-modal">
			<div className={this.backgroundClass()}>
				<div className="component-inserter-modal__modal">
					<ul>{this.getInsertableComponents()}</ul>
				</div>
			</div>
		</div>);
	}
}
