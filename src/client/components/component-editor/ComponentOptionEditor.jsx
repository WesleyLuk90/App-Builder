import React from 'react';

import ComponentOptionInput from './ComponentOptionInput';


export default class ComponentOptionEditor extends React.Component {

	getComponent() {
		return this.props.component;
	}

	getComponentOptions() {
		return this.props.component.getComponentOptions();
	}

	render() {
		if (!this.props.component) {
			return <div className="component-option-editor">Select a component to edit</div>;
		}
		return (<div className="component-option-editor">
			<h2 className="header">{this.getComponent().getName()}</h2>
			{this.getComponentOptions().map((option, index) =>
				<ComponentOptionInput key={index} option={option} {...this.props} />)}
		</div>);
	}
}
