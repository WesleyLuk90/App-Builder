import React from 'react';
import classnames from 'classnames';

import AbstractComponentEditor from './AbstractComponentEditor';
import ComponentEditor from './ComponentEditor';

export default class ComponentPlaceholder extends AbstractComponentEditor {
	clickEdit(event) {
		event.preventDefault();
		this.props.componentEditor.setSelectedComponent(this.props.component);
	}

	clickRemove(event) {
		event.preventDefault();
		this.props.component.props.onRemoveComponent(this.props.component);
	}

	render() {
		const placeholderClassname = classnames(
			'component-placeholder', {
				'component-placeholder--selected': this.props.componentEditor.isSelectedComponent(this),
			}
		);
		return (<div className={placeholderClassname}>
			<div className="component-placeholder__header">
				<div className="component-placeholder__label">
					{this.props.componentInfo.getName()}
				</div>
				<div className="component-placeholder__actions">
					<a className="component-placeholder__action">
						<span className="fa fa-fw fa-pencil" onClick={e => this.clickEdit(e)} />
					</a>
					<a className="component-placeholder__action">
						<span className="fa fa-fw fa-remove" onClick={e => this.clickRemove(e)} />
					</a>
					<a className="component-placeholder__action">
						<span className="fa fa-fw fa-backward" onClick={e => this.clickRemove(e)} />
					</a>
					<a className="component-placeholder__action">
						<span className="fa fa-fw fa-forward" onClick={e => this.clickRemove(e)} />
					</a>
				</div>
			</div>
			<div className="component-placeholder__preview">
				{ this.props.children }
			</div>
		</div>);
	}
}

ComponentPlaceholder.propTypes = {
	componentEditor: React.PropTypes.instanceOf(ComponentEditor).isRequired,
};
