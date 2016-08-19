import ReactDom from 'react-dom';

import ComponentFactory from './components/ComponentFactory';
import ComponentMap from './components/ComponentMap';
import ComponentListBuilder from './components/ComponentListBuilder';
import ComponentBuilder from './components/ComponentBuilder';
import ProgramScope from '../scripting/ProgramScope';
import ProgramBuilder from '../scripting/builder/ProgramBuilder';
import ComputedVariableBuilder from '../scripting/builder/ComputedVariableBuilder';
import AllTypes from '../scripting/types/AllTypes';

require('../scss/main.scss');

function main(document) {
	const appContainer = document.querySelector('.app-container');

	const pageDefinition = ComponentBuilder.newBuilder('ComponentEditor')
		.setComponents('children', ComponentListBuilder.newBuilder()
			.addComponent(ComponentBuilder.newBuilder('Page')
				.setComponents('children', ComponentListBuilder.newBuilder()
					.addComponent(
						ComponentBuilder.newBuilder('Label')
						.setNamedVariable('text', ['text_value'])
					)
					.addComponent(ComponentBuilder.newBuilder('TextField')
						.setValue('placeholder', 'Hello World')
						.setNamedVariable('value', ['text_value'])
					)
					.addComponent(ComponentBuilder.newBuilder('Table')
						.setValue('scopeName', 'loopScope1')
						.setComponents('headers', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Label').setNamedVariable('text', ['my_other_value']))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Header 2'))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Header 3'))
						)
						.setComponents('columns', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Row'))
							.addComponent(ComponentBuilder.newBuilder('Label').setNamedVariable('text', ['loopScope1', 'column_value']))
						)
						.setComponents('footers', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Footer 4'))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Footer 5'))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Footer 6'))
						)
						.setValue('foreach', [1, 2, 3, 4])
						.setScopedVariable('as', ['loopScope1', 'rowNumber'])
					)
				)
			)
		).toJSONObject();
	const componentMap = new ComponentMap();
	const componentFactory = new ComponentFactory(componentMap);

	const programDefinition = ProgramBuilder.newBuilder()
		.addVariable('text_value', AllTypes.getStringType())
		.addVariable('teacher', AllTypes.getObjectType('teacher'))
		.addBoundVariable('teacher_name', AllTypes.getStringType(), ['teacher'], 'name')
		.addComputedVariable('my_other_value', AllTypes.getStringType(), ComputedVariableBuilder.newBuilder()
			.addParameter(['text_value'], 'text_value')
			.setBody("return text_value + 'is the value';")
		)
		.addScope(ProgramBuilder.newScope(['loopScope1'])
			.addVariable('rowNumber', AllTypes.getNumberType())
			.addComputedVariable('column_value', AllTypes.getStringType(), ComputedVariableBuilder.newBuilder()
				.addParameter(['loopScope1', 'rowNumber'], 'rowNumber')
				.addParameter(['text_value'], 'inputValue')
				.setBody('return `${inputValue} ${rowNumber} + Row`;')
			)
		)
		.toJSONObject();

	const props = {
		page: pageDefinition,
		ComponentFactory: componentFactory,
		ProgramScope: ProgramScope.create(programDefinition),
		ComponentMap: componentMap,
	};
	const element = componentFactory.withProps(props).buildComponent(pageDefinition);
	ReactDom.render(element, appContainer);
}

main(document);
