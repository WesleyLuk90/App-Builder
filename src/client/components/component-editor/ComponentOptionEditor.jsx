import React from 'react';

import ComponentOptionInput from './ComponentOptionInput';


export default class ComponentOptionEditor extends React.Component {

	getComponentOptions() {
		return this.props.component.getComponentOptions();
	}

	render() {
		if (!this.props.component) {
			return <div className="component-option-editor">Select a component to edit</div>;
		}
		return (<div className="component-option-editor">
			{this.getComponentOptions().map((option, index) =>
				<ComponentOptionInput key={index} option={option} {...this.props} />)}
		</div>);
	}
}
