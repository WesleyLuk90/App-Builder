import React from 'react';

import ComponentInserterModal from './ComponentInserterModal';

export default class ComponentInserter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			shown: false,
		};
	}

	clickOpenInserter(event) {
		event.preventDefault();
		this.openModal();
	}

	openModal() {
		this.setState({ shown: true });
	}

	closeModal() {
		this.setState({ shown: false });
	}

	render() {
		return (<div className="component-inserter">
			<a className="component-inserter__button" onClick={(e) => this.clickOpenInserter(e)}>
				<span className="fa fa-fw fa-2x fa-plus-circle" />
			</a>
			<ComponentInserterModal
				shown={this.state.shown}
				{...this.props}
				onComplete={() => this.closeModal()}
			/>
		</div>);
	}
}
