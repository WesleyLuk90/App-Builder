import React from 'react';

import ComponentOptionEditor from './ComponentOptionEditor';


export default class ComponentEditorProperties extends React.Component {

	render() {
		if (!this.props.component) {
			return <div>Select a Component to Edit</div>;
		}
		return (<div>
			{this.props.component.getScopePath().toString()}
			<ComponentOptionEditor {...this.props} />
		</div>);
	}
}
