import ProgramBuilder from '../ProgramBuilder';
import AllTypes from '../../types/AllTypes';
import ComputedVariableBuilder from '../ComputedVariableBuilder';

describe('ProgramBuilder', () => {
	it('should generate a program with variables of different types', () => {
		const programData = ProgramBuilder.newBuilder()
			.addNormalVariable('myString', AllTypes.getStringType())
			.addNormalVariable('myObject', AllTypes.getObjectType('trees'))
			.toJSONObject();

		expect(programData).toEqual({
			name: [],
			variables: [{
				localName: 'myString',
				type: { type: 'string' },
			}, {
				localName: 'myObject',
				type: { type: 'object', model: 'trees' },
			}],
			scopes: {},
		});
	});

	it('should generate a program with a bound value', () => {
		const programData = ProgramBuilder.newBuilder()
			.addNormalVariable('tree', AllTypes.getObjectType('trees'))
			.addBoundVariable('height', AllTypes.getNumberType(), ['tree'], 'height')
			.toJSONObject();

		expect(programData).toEqual({
			name: [],
			variables: [{
				localName: 'tree',
				type: { type: 'object', model: 'trees' },
			}, {
				localName: 'height',
				type: { type: 'number' },
				binding: {
					variableName: ['tree'],
					property: 'height',
				},
			}],
			scopes: {},
		});
	});

	it('should generate a program with a computed value', () => {
		const programData = ProgramBuilder.newBuilder()
			.addNormalVariable('age', AllTypes.getNumberType())
			.addComputedVariable('nextYearsAge', AllTypes.getNumberType(), ComputedVariableBuilder.newBuilder()
				.addParameter(['age'], 'age')
				.setBody('return age + 1;'))
			.toJSONObject();

		expect(programData).toEqual({
			name: [],
			variables: [{
				localName: 'age',
				type: { type: 'number' },
			}, {
				localName: 'nextYearsAge',
				type: { type: 'number' },
				computation: {
					parameters: [{
						variableName: ['age'],
						localName: 'age',
					}],
					body: 'return age + 1;',
				},
			}],
			scopes: {},
		});
	});

	it('should parse program data', () => {
		const programData = {
			name: [],
			variables: [{
				localName: 'age',
				type: { type: 'number' },
			}, {
				localName: 'nextYearsAge',
				type: { type: 'number' },
				computation: {
					parameters: [{
						variableName: ['age'],
						localName: 'age',
					}],
					body: 'return age + 1;',
				},
			}, {
				localName: 'height',
				type: { type: 'number' },
				binding: {
					variableName: ['tree'],
					property: 'height',
				},
			}],
			scopes: {
				testScope: {
					name: ['testScope'],
					variables: [{
						localName: 'testVar',
						type: { type: 'number' },
					}],
					scopes: {},
				},
			},
		};
		const programBuilder = ProgramBuilder.fromData(programData);

		expect(programBuilder.toJSONObject()).toEqual(programData);
	});

	it('should generate a program with a child scope', () => {
		const programData = ProgramBuilder.newBuilder()
			.addScope(
				ProgramBuilder
				.newScope(['testScope'])
				.addNormalVariable('testVar', AllTypes.getNumberType())
			)
			.toJSONObject();

		expect(programData).toEqual({
			name: [],
			variables: [],
			scopes: {
				testScope: {
					name: ['testScope'],
					variables: [{
						localName: 'testVar',
						type: { type: 'number' },
					}],
					scopes: {},
				},
			},
		});
	});
});
