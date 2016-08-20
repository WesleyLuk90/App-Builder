import ModelDataBuilder from '../ModelDataBuilder';
import ModelBuilder from '../ModelBuilder';
import AllTypes from '../../types/AllTypes';

describe('ModelDataBuilder', () => {
	it('should generate model data', () => {
		const modelData = ModelDataBuilder.newBuilder()
			.addModel(ModelBuilder.newBuilder('people')
				.addField('name', AllTypes.getStringType())
				.addField('age', AllTypes.getNumberType())
			)
			.toJSONObject();
		expect(modelData).toEqual([{
			name: 'people',
			fields: [{
				name: 'name',
				type: {
					type: 'string',
				},
			}, {
				name: 'age',
				type: {
					type: 'number',
				},
			}],
		}]);
	});
});
