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

		expect(spy).toHaveBeenCalledWith(10);
	});

	it('should notify when bound variable changes', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('teacher', AllTypes.getObjectType('teacher'))
			.addBoundVariable('age', AllTypes.getNumberType(), ['teacher'], 'age')
			.toJSONObject();

		const programScope = ProgramScope.create(programData);

		const spy = jasmine.createSpy('notify');
		programScope.getValueStream(['age']).subscribe(spy);

		programScope.setValue(['teacher'], { age: 20 });
		expect(spy).toHaveBeenCalledWith(20);

		expect(programScope.getValue(['age'])).toEqual(20);
	});

	it('should notify a property of an object is changed', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('teacher', AllTypes.getObjectType('teacher'))
			.addBoundVariable('age', AllTypes.getNumberType(), ['teacher'], 'age')
			.toJSONObject();

		const programScope = ProgramScope.create(programData);
		programScope.setValue(['teacher'], { age: 20 });

		const spy = jasmine.createSpy('notify');
		programScope.getValueStream(['teacher']).subscribe(spy);
		expect(spy).toHaveBeenCalledWith({ age: 20 });

		programScope.setValue(['age'], 30);
		expect(spy).toHaveBeenCalledWith({ age: 30 });

		expect(programScope.getValue(['teacher']).age).toEqual(30);
	});

	it('should calculate a computed value', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('age', AllTypes.getNumberType())
			.addComputedVariable('nextYearsAge', AllTypes.getNumberType(), ComputedVariableBuilder.newBuilder()
				.addParameter(['age'], 'age')
				.setBody('return age + 1;'))
			.toJSONObject();

		const programScope = ProgramScope.create(programData);

		const spy = jasmine.createSpy('notify');
		programScope.getValueStream(['nextYearsAge']).subscribe(spy);

		programScope.setValue(['age'], 20);
		expect(spy).toHaveBeenCalledWith(21);

		expect(programScope.getValue(['nextYearsAge'])).toEqual(21);
	});

	it('have an object with an object parameter and not infinite loop', () => {
		const programData = ProgramBuilder.newBuilder()
			.addVariable('tree', AllTypes.getObjectType('trees'))
			.addBoundVariable('branch', AllTypes.getObjectType('branch'), ['tree'], 'branch')
			.toJSONObject();

		const programScope = ProgramScope.create(programData);

		programScope.setValue(['tree'], { branch: { isABranch: true } });

		const treeSubscriber = jasmine.createSpy('treeSubscriber');
		programScope.getValueStream(['tree']).subscribe(treeSubscriber);
		expect(treeSubscriber).toHaveBeenCalledWith({ branch: { isABranch: true } });

		const branchSubscriber = jasmine.createSpy('branchSubscriber');
		programScope.getValueStream(['branch']).subscribe(branchSubscriber);
		expect(branchSubscriber).toHaveBeenCalledWith({ isABranch: true });

		expect(programScope.getValue(['branch'])).toEqual({ isABranch: true });

		console.log("Set value");
		programScope.setValue(['branch'], { reallyIsABranch: true });
		expect(treeSubscriber).toHaveBeenCalledWith({ branch: { reallyIsABranch: true } });
		expect(branchSubscriber).toHaveBeenCalledWith({ reallyIsABranch: true });

		expect(treeSubscriber.calls.count()).toBe(2);
		expect(branchSubscriber.calls.count()).toBe(2);

		expect(programScope.getValue(['tree'])).toEqual({ branch: { reallyIsABranch: true } });
	});
});
