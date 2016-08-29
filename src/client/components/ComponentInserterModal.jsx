import React from 'react';
import classnames from 'classnames';

export default class ComponentInserterModal extends React.Component {
	getInsertableComponents() {
		return this.props.componentMap.getInsertableComponents()
			.map(component => component.getComponentInfo())
			.map((componentInfo, index) =>
				(<li key={index} className="component-inserter-modal__item">
					<a
						onClick={(e) => this.selectComponent(e, componentInfo.getName())}
					>
						<span className={`component-inserter-modal__icon ${componentInfo.getIconClass()}`} />
						{componentInfo.getName()}
					</a>
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
			<div className="component-inserter-modal__background" onClick={e => this.clickBackground(e)} />
			<div className="component-inserter-modal__modal">
				<h2>Select Component</h2>
				<ul className="component-inserter-modal__list">{this.getInsertableComponents()}</ul>
			</div>
		</div>);
	}
}
