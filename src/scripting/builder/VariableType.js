const VariableTypes = {
	NORMAL: {
		name: 'Normal',
	},
	BOUND: {
		name: 'Bound',
	},
	COMPUTED: {
		name: 'Computed',
	},

	getByName(name) {
		if (name === VariableTypes.NORMAL.name) {
			return VariableTypes.NORMAL;
		} else if (name === VariableTypes.BOUND.name) {
			return VariableTypes.BOUND;
		} else if (name === VariableTypes.COMPUTED.name) {
			return VariableTypes.COMPUTED;
		}
		throw new Error(`Invalid VariableType name ${name}`);
	},
};

export default VariableTypes;
