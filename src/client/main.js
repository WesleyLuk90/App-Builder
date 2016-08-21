import ReactDom from 'react-dom';

import ComponentBuilder from './components/ComponentBuilder';
import ComponentFactory from './components/ComponentFactory';
import ComponentListBuilder from './components/ComponentListBuilder';
import ComponentMap from './components/ComponentMap';
import ComputedVariableBuilder from '../scripting/builder/ComputedVariableBuilder';

import AllTypes from '../scripting/types/AllTypes';
import ModelBuilder from '../scripting/builder/ModelBuilder';
import ModelDataBuilder from '../scripting/builder/ModelDataBuilder';
import ModelList from '../scripting/ModelList';
import ProgramBuilder from '../scripting/builder/ProgramBuilder';
import ProgramScope from '../scripting/ProgramScope';

require('../scss/main.scss');

function main(document) {
	const appContainer = document.querySelector('.app-container');

	const programDefinition = ProgramBuilder.newBuilder()
		.addNormalVariable('text_value', AllTypes.getStringType())
		.addNormalVariable('teacher', AllTypes.getObjectType('people'))
		.addBoundVariable('teacher_name', AllTypes.getNumberType(), ['teacher'], 'age')
		.addComputedVariable('my_other_value', AllTypes.getStringType(), ComputedVariableBuilder.newBuilder()
			.addParameter(['text_value'], 'text_value')
			.setBody("\treturn text_value + 'is the value';")
		)
		.addScope(ProgramBuilder.newScope(['loopScope1'])
			.addNormalVariable('rowNumber', AllTypes.getNumberType())
			.addComputedVariable('column_value', AllTypes.getStringType(), ComputedVariableBuilder.newBuilder()
				.addParameter(['loopScope1', 'rowNumber'], 'rowNumber')
				.addParameter(['text_value'], 'inputValue')
				.setBody('return `${inputValue} ${rowNumber} + Row`;')
			)
		)
		.toJSONObject();

	const pageDefinition = ComponentBuilder.newBuilder('ComponentEditor')
		.setValue('program', programDefinition)
		.setComponents('children', ComponentListBuilder.newBuilder()
			.addComponent(ComponentBuilder.newBuilder('Page')
				.setComponents('children', ComponentListBuilder.newBuilder()
					.addComponent(
						ComponentBuilder.newBuilder('Text')
						.setNamedVariable('text', ['text_value'])
					)
					.addComponent(ComponentBuilder.newBuilder('TextField')
						.setValue('placeholder', 'Hello World')
						.setNamedVariable('value', ['text_value'])
					)
					.addComponent(ComponentBuilder.newBuilder('Table')
						.setValue('scopeName', 'loopScope1')
						.setComponents('headers', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Text').setNamedVariable('text', ['my_other_value']))
							.addComponent(ComponentBuilder.newBuilder('Text').setValue('text', 'My Header 2'))
							.addComponent(ComponentBuilder.newBuilder('Text').setValue('text', 'My Header 3'))
						)
						.setComponents('columns', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Text').setValue('text', 'My Row'))
							.addComponent(ComponentBuilder.newBuilder('Text').setNamedVariable('text', ['loopScope1', 'column_value']))
						)
						.setComponents('footers', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Text').setValue('text', 'My Footer 4'))
							.addComponent(ComponentBuilder.newBuilder('Text').setValue('text', 'My Footer 5'))
							.addComponent(ComponentBuilder.newBuilder('Text').setValue('text', 'My Footer 6'))
						)
						.setValue('foreach', [1, 2, 3, 4])
						.setScopedVariable('as', ['loopScope1', 'rowNumber'])
					)
				)
			)
		).toJSONObject();
	const componentMap = new ComponentMap();
	const componentFactory = new ComponentFactory(componentMap);

	const modelData = ModelDataBuilder.newBuilder()
		.addModel(ModelBuilder.newBuilder('people')
			.addField('name', AllTypes.getStringType())
			.addField('age', AllTypes.getStringType())
		)
		.toJSONObject();

	const props = {
		page: pageDefinition,
		componentFactory,
		programScope: ProgramScope.create(programDefinition),
		componentMap,
		modelList: ModelList.fromData(modelData),
	};
	const element = componentFactory.withProps(props).buildComponent(pageDefinition);
	ReactDom.render(element, appContainer);
}

main(document);
