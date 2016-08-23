import React from 'react';

import ComponentOptionEditor from './ComponentOptionEditor';

export default class ComponentEditorProperties extends React.Component {
	getComponent() {
		return this.props.component;
	}

	render() {
		if (this.getComponent()) {
			console.log(this.getComponent().getScopeName());
		}
		return (<div>
			<ComponentOptionEditor component={this.getComponent()} {...this.props} />
		</div>);
	}
}
