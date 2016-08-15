import ReactDom from 'react-dom';

import ComponentFactory from './components/ComponentFactory';
import ComponentMap from './components/ComponentMap';
import ComponentListBuilder from './components/ComponentListBuilder';
import ComponentBuilder from './components/ComponentBuilder';
import VariableList from '../scripting/VariableList';

function main(document) {
	const appContainer = document.querySelector('.app-container');

	const pageDefinition = ComponentBuilder.newBuilder('ComponentEditor')
		.setComponents('children', ComponentListBuilder.newBuilder()
			.addComponent(ComponentBuilder.newBuilder('Page')
				.setComponents('children', ComponentListBuilder.newBuilder()
					.addComponent(
						ComponentBuilder.newBuilder('Label')
						.setNamedVariable('text', ['text_value']))
					.addComponent(ComponentBuilder.newBuilder('TextField')
						.setValue('placeholder', 'Hello World')
						.setNamedVariable('value', ['text_value']))
				)
			)
		).toJSONObject();
	const componentFactory = new ComponentFactory(new ComponentMap());

	const props = {
		page: pageDefinition,
		ComponentFactory: componentFactory,
		VariableList: VariableList.create(),
	};
	const element = componentFactory.withProps(props).buildComponent(pageDefinition);
	ReactDom.render(element, appContainer);
}

main(document);
