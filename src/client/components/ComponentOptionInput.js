import React from 'react';

import AbstractComponent from './AbstractComponent';

export default class ComponentOptionInput extends AbstractComponent {
	render() {
		return (<div className="component-option-input">
			<label className="label">{this.props.option.getName()}</label>
			{this.props.option.getType().constructor.name}
		</div>);
	}
}
