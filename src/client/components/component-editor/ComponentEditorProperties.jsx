import React from 'react';

import ComponentOptionEditor from './ComponentOptionEditor';

export default class ComponentEditorProperties extends React.Component {

	getComponent() {
		return this.props.component;
	}

	render() {
		if (!this.getComponent()) {
			return null;
		}
		return (<div>
			{this.getComponent().getScopePath().toString()}
			<ComponentOptionEditor component={this.getComponent()} {...this.props} />
		</div>);
	}
}
