import AbstractComponent from './AbstractComponent';

export default class AbstractComponentEditor extends AbstractComponent {
	getDisplayValue(key) {
		if (this.hasValue(key)) {
			return this.props.values[key];
		}
		if (this.hasNamedVariable(key)) {
			return `{${this.props.namedVariables[key]}}`;
		}
		return '{null}';
	}

	getProgramBuilder() {
		return this.props.programBuilder;
	}
	getComponentOptions() {
		return [];
	}
	componentDidMount() {}
	componentWillUnmount() {}
}
