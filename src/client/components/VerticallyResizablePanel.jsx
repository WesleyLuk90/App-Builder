import React from 'react';
import Rx from 'rx';

export default class VerticallyResizablePanel extends React.Component {

	constructor(props) {
		super(props);

		this.startY = 0;
		this.startHeight = 0;
		this.dragSubject = new Rx.Subject();

		this.dragSubject
			.throttle(100)
			.subscribe(e => {

				if (e.clientY === 0) {
					return;
				}
				const newHeight = (this.startY - e.clientY) + this.startHeight;
				this.setState({ height: newHeight });
			});

		this.state = {
			height: -1,
		};
	}

	getStyle() {
		if (this.state.height < 0) {
			return {};
		}
		return {
			height: this.state.height,
		};
	}

	onDrag(e) {
		e.persist();
		this.dragSubject.onNext(e);
	}

	onDragStart(e) {
		// Disable the dragging ghost preview
		e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
		this.startY = e.clientY;
		this.startHeight = this.state.height;
	}

	componentDidMount() {
		this.state.height = this.scriptEditor.clientHeight;
	}

	render() {
		return (<div className={this.props.className + ' vertical-resize'} ref={e => { this.scriptEditor = e; }} style={this.getStyle()}>
			<div className="vertical-resize__handle" draggable onDrag={e => this.onDrag(e)} onDragStart={e => this.onDragStart(e)} />
			{this.props.children}
		</div>);
	}
}
