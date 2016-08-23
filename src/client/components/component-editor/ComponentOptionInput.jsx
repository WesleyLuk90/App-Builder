import React from 'react';
import _ from 'lodash';

import AbstractComponent from '../AbstractComponent';


export default class ComponentOptionInput extends AbstractComponent {
	constructor(props) {
		super(props);
		this.id = _.uniqueId();
	}
	render() {
		return (<div className="component-option-input">
			<label className="label" htmlFor={this.id}>{this.props.option.getName()}</label>
			<select className="dropdown" id={this.id}>
				<option>Static Value</option>
				<option>Variable</option>
			</select>
			{this.props.option.getType().constructor.name}
		</div>);
	}
}
