import ProgramBuilder from '../builder/ProgramBuilder';
import ComputedVariableBuilder from '../builder/ComputedVariableBuilder';
import AllTypes from '../types/AllTypes';
import ProgramScope from '../ProgramScope';

describe('ProgramScope', () => {

	it('should throw an error if a variable doesnt exist', () => {
		const programData = ProgramBuilder.newBuilder()
			.toJSONObject();

		const programScope = ProgramScope.create(programData);

		expect(() =>
			programScope.getValueStream(['age'])
		).toThrow();

		expect(() =>
			programScope.setValue(['age'])
		).toThrow();

		expect(() =>
			programScope.getValue(['age'])
		).toThrow();
	});

	it('should notify when a variable changes', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('age', AllTypes.getNumberType())
			.toJSONObject();

		const programScope = ProgramScope.create(programData);

		const spy = jasmine.createSpy('notify');
		programScope.getValueStream(['age']).subscribe(spy);

		programScope.setValue(['age'], 10);

		expect(programScope.getValue(['age'])).toEqual(10);

		expect(spy).toHaveBeenCalled();
	});

	it('should notify when bound variable changes', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('teacher', AllTypes.getObjectType('teacher'))
			.addBoundVariable('age', AllTypes.getNumberType(), ['teacher', 'age'])
			.toJSONObject();

		const programScope = ProgramScope.create(programData);

		const spy = jasmine.createSpy('notify');
		programScope.getValueStream(['age']).subscribe(spy);

		programScope.setValue(['teacher'], { age: 20 });
		expect(spy).toHaveBeenCalled();

		expect(programScope.getValue(['age'])).toEqual(20);
	});
});
