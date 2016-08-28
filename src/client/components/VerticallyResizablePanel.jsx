import React from 'react';
import Rx from 'rx';

export default class VerticallyResizablePanel extends React.Component {

	constructor(props) {
		super(props);

		this.startY = 0;
		this.startHeight = 0;
		this.isDragging = false;

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

	onMouseDown(e) {
		this.startDrag();
		this.startY = e.clientY;
		this.startHeight = this.state.height;
	}

	startDrag() {
		this.isDragging = true;
		document.body.style.mozUserSelect = 'none';
		document.body.style.webkitUserSelect = 'none';
		document.body.style.userSelect = 'none';
	}

	stopDrag() {
		this.isDragging = false;
		delete document.body.style.mozUserSelect;
		delete document.body.style.webkitUserSelect;
		delete document.body.style.userSelect;
	}

	componentDidMount() {
		this.state.height = this.scriptEditor.clientHeight;
		this.subscriptions = [];
		const mouseMoveEvent = Rx.Observable.fromEvent(window, 'mousemove')
			.throttle(30)
			.subscribe(e => {
				if (!this.isDragging) {
					return;
				}
				const newHeight = (this.startY - e.clientY) + this.startHeight;
				this.setState({ height: newHeight });
			});
		this.subscriptions.push(mouseMoveEvent);
		const mouseUpEvent = Rx.Observable.fromEvent(window, 'mouseup')
			.subscribe(() => this.stopDrag());
		this.subscriptions.push(mouseUpEvent);
	}

	componentWillUnmount() {
		this.subscriptions.forEach(s => s.dispose());
	}

	render() {
		return (<div className={`${this.props.className} vertical-resize`} ref={e => { this.scriptEditor = e; }} style={this.getStyle()}>
			<div className="vertical-resize__handle" onMouseDown={e => this.onMouseDown(e)} />
			{this.props.children}
		</div>);
	}
}
