import React from 'react';

import ComponentOptionInput from './ComponentOptionInput';

export default class ComponentOptionEditor extends React.Component {

	getComponent() {
		return this.props.component;
	}

	getOptions() {
		if (!this.props.component) {
			return [];
		}
		return this.props.component.getComponentOptions();
	}

	render() {
		if (!this.getComponent()) {
			return <div className="component-option-editor">Select a component to edit</div>;
		}
		return (<div className="component-option-editor">
			<h2 className="header">{this.getComponent().constructor.name}</h2>
			{this.getOptions().map((option, index) =>
				<ComponentOptionInput key={index} option={option} />)}
		</div>);
	}
}
