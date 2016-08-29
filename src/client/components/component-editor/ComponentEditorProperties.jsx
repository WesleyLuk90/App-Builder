import React from 'react';

import ComponentOptionEditor from './ComponentOptionEditor';


export default class ComponentEditorProperties extends React.Component {

	getScopePath() {
		return this.props.component.getScopePath().toString();
	}

	getComponent() {
		return this.props.component;
	}

	render() {
		if (!this.props.component) {
			return <div>Select a Component to Edit</div>;
		}
		return (<div className="component-editor-properties">
			<h2 className="header">{this.getComponent().getComponentInfo().getName()}</h2>
			<p>Scope: {this.getScopePath()}</p>
			<ComponentOptionEditor {...this.props} />
		</div>);
	}
}
