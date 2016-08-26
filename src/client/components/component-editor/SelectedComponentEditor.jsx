import React from 'react';

export default class SelectedComponentEditor extends React.Component {

	selectedComponentChanged() {}

	componentDidMount() {
		this.subscriptions = [
			this.props.selectedComponentStore.getSelectedComponentStream().subscribe(() => {
				this.selectedComponentChanged();
				this.forceUpdate();
			}),
		];
	}

	componentWillUnmount() {
		this.subscriptions.forEach(s => s.dispose());
	}

	hasSelectedComponent() {
		return this.props.selectedComponentStore.hasSelectedComponent();
	}

	getComponent() {
		return this.props.selectedComponentStore.getSelectedComponent();
	}

	getComponentOptions() {
		return this.getComponent().getComponentOptions();
	}

}
