import AbstractComponent from './AbstractComponent';

export default class AbstractComponentEditor extends AbstractComponent {

	getName() {
		return this.constructor.name;
	}

	getDisplayValue(key) {
		if (this.hasValue(key)) {
			return this.props.values[key];
		}
		if (this.hasNamedVariable(key)) {
			return `{${this.props.namedVariables[key]}}`;
		}
		return '{No Binding}';
	}

	getProgramBuilder() {
		return this.props.programBuilder;
	}
	getComponentOptions() {
		return [];
	}
	componentDidMount() {}
	componentWillUnmount() {}

	switchToNamedVariableBinding(option) {
		delete this.props.values[option.getName()];
		this.forceUpdate();
	}

	switchToStaticValueBinding(option) {
		delete this.props.namedVariables[option.getName()];
		this.forceUpdate();
	}

	setNamedVariableBinding(option, variableName) {
		this.props.namedVariables[option.getName()] = variableName;
		this.forceUpdate();
	}
}
