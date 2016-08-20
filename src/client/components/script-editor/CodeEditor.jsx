import React from 'react';
import ace from 'brace';

const Range = ace.acequire('ace/range').Range;

require('brace/mode/javascript');
require('brace/theme/monokai');

export default class CodeEditor extends React.Component {

	constructor(props) {
		super(props);

		this.currentHeader = '';
		this.currentCode = '';
		this.currentFooter = '';
	}

	loadCode(props) {
		this.currentHeader = props.header || '';
		this.currentCode = props.code || '';
		this.currentFooter = props.footer || '';

		this.contents = this.currentCode;
		if (this.currentHeader) {
			this.contents = `${this.currentHeader}\n${this.contents}`;
		}
		if (this.currentFooter) {
			this.contents = `${this.contents}\n${this.currentFooter}`;
		}
		this.editor.setValue(this.contents);
	}

	getProtectedRanges() {
		const lines = this.editor.getSession().getDocument().getLength();
		return [
			new Range(0, 0, 0, this.currentHeader.length),
			new Range(lines - 1, 0, lines - 1, this.currentFooter.length),
		];
	}

	componentDidMount() {
		const editor = ace.edit(this.element);
		this.editor = editor;
		editor.setTheme('ace/theme/monokai');
		editor.getSession().setMode('ace/mode/javascript');
		// Removes warning in console
		editor.$blockScrolling = Infinity;

		this.loadCode(this.props);
		editor.on('change', () => {
			this.emitChangeEvent();
		});

		editor.keyBinding.addKeyboardHandler({
			handleKeyboard: (data, hash, keyString, keyCode, event) => {
				if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false;
				const selectedRange = editor.getSelectionRange();
				const protectedRanges = this.getProtectedRanges();
				for (let i = 0; i < protectedRanges.length; i++) {
					if (protectedRanges[i].intersects(selectedRange)) {
						return {
							command: 'null',
							passEvent: false,
						};
					}
				}
				return null;
			},
		});
	}

	getHeaderLength() {
		if (this.currentHeader) {
			return this.currentHeader.length + 1;
		}
		return 0;
	}

	getFooterLength() {
		if (this.currentFooter) {
			return this.currentFooter.length + 1;
		}
		return 0;
	}

	emitChangeEvent() {
		if (this.props.onChange) {
			const contents = this.editor.getSession().getDocument().getValue();
			const body = contents.substring(this.getHeaderLength(), contents.length - this.getFooterLength());
			this.props.onChange(body);
		}
	}

	componentWillReceiveProps(nextProps) {
		this.loadCode(nextProps);
	}

	componentWillUnmount() {
		this.editor.destroy();
	}

	render() {
		const style = { width: this.props.width, height: this.props.height };
		return <div className="code-editor" ref={e => { this.element = e; }} style={style} />;
	}
}
