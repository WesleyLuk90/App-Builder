import ProgramBuilder from '../ProgramBuilder';
import AllTypes from '../../types/AllTypes';
import ComputedVariableBuilder from '../ComputedVariableBuilder';

describe('ProgramBuilder', () => {
	it('should generate a program with variables of different types', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('myString', AllTypes.getStringType())
			.addVariable('myObject', AllTypes.getObjectType('trees'))
			.toJSONObject();

		expect(programData).toEqual({
			name: [],
			variables: [{
				name: 'myString',
				type: { type: 'string' },
			}, {
				name: 'myObject',
				type: { type: 'object', model: 'trees' },
			}],
			scopes: {},
		});
	});

	it('should generate a program with a bound value', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('tree', AllTypes.getObjectType('trees'))
			.addBoundVariable('height', AllTypes.getNumberType(), ['tree'], 'height')
			.toJSONObject();

		expect(programData).toEqual({
			name: [],
			variables: [{
				name: 'tree',
				type: { type: 'object', model: 'trees' },
			}, {
				name: 'height',
				type: { type: 'number' },
				binding: {
					variable: ['tree'],
					property: 'height',
				},
			}],
			scopes: {},
		});
	});

	it('should generate a program with a computed value', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('age', AllTypes.getNumberType())
			.addComputedVariable('nextYearsAge', AllTypes.getNumberType(), ComputedVariableBuilder.newBuilder()
				.addParameter(['age'], 'age')
				.setBody('return age + 1;'))
			.toJSONObject();

		expect(programData).toEqual({
			name: [],
			variables: [{
				name: 'age',
				type: { type: 'number' },
			}, {
				name: 'nextYearsAge',
				type: { type: 'number' },
				computation: {
					parameters: [{
						variable: ['age'],
						localVariable: 'age',
					}],
					body: 'return age + 1;',
				},
			}],
			scopes: {},
		});
	});
});
