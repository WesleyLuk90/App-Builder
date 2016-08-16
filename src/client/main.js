import ReactDom from 'react-dom';

import ComponentFactory from './components/ComponentFactory';
import ComponentMap from './components/ComponentMap';
import ComponentListBuilder from './components/ComponentListBuilder';
import ComponentBuilder from './components/ComponentBuilder';
import VariableList from '../scripting/VariableList';

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
						.setComponents('headers', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Header 1'))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Header 2'))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Header 3'))
						)
						.setComponents('columns', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Row'))
						)
						.setComponents('footers', ComponentListBuilder.newBuilder()
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Footer 4'))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Footer 5'))
							.addComponent(ComponentBuilder.newBuilder('Label').setValue('text', 'My Footer 6'))
						)
						.setValue('foreach', [1, 2, 3, 4])
						.setNamedVariable('as', ['thing'])
					)
				)
			)
		).toJSONObject();
	const componentMap = new ComponentMap();
	const componentFactory = new ComponentFactory(componentMap);

	const props = {
		page: pageDefinition,
		ComponentFactory: componentFactory,
		VariableList: VariableList.create(),
		ComponentMap: componentMap,
	};
	const element = componentFactory.withProps(props).buildComponent(pageDefinition);
	ReactDom.render(element, appContainer);
}

main(document);
