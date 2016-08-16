import React from 'react';

import AbstractComponent from './AbstractComponent';
import ComponentInserterModal from './ComponentInserterModal';

export default class ComponentInserter extends AbstractComponent {
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
				{...this.createProps({ shown: this.state.shown })}
				onComplete={() => this.closeModal()}
			/>
		</div>);
	}
}
