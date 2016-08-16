import React from 'react';
import classnames from 'classnames';

import AbstractComponent from './AbstractComponent';

export default class ComponentInserterModal extends AbstractComponent {
	getInsertableComponents() {
		return this.props.ComponentMap.getInsertableComponentNames()
			.map((componentName, index) =>
				(<li key={index}>
					<a onClick={(e) => this.selectComponent(e, componentName)}>{componentName}</a>
				</li>)
			);
	}

	selectComponent(event, componentName) {
		event.preventDefault();
		this.insertComponent(componentName);
		this.props.onComplete();
	}

	insertComponent(componentName) {
		this.props.insertContext.insertComponentByName(componentName);
	}

	containerClass() {
		return classnames('component-inserter-modal', {
			'component-inserter-modal--shown': this.props.shown,
		});
	}

	clickBackground(e) {
		e.preventDefault();
		this.props.onComplete();
	}

	render() {
		return (<div className={this.containerClass()}>
			<div className="component-inserter-modal__background" onClick={e => this.clickBackground(e)}/>
			<div className="component-inserter-modal__modal">
				<ul>{this.getInsertableComponents()}</ul>
			</div>
		</div>);
	}
}
