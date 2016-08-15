import Renderer from './renderer/Renderer';
import Button from './elements/Button';

const renderer = new Renderer(document);

const appContainer = document.querySelector('.app-container');

const button = new Button();
button.setChildren("hello world");
renderer.render(appContainer, button);