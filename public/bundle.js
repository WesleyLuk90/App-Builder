/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.head.appendChild(el);
/******/ 	}());

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _Renderer = __webpack_require__(1);\n\nvar _Renderer2 = _interopRequireDefault(_Renderer);\n\nvar _Button = __webpack_require__(4);\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar renderer = new _Renderer2.default(document);\n\nvar appContainer = document.querySelector('.app-container');\n\nvar button = new _Button2.default();\nbutton.setChildren(\"hello world\");\nrenderer.render(appContainer, button);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2xpZW50L21haW4uanM/OWEzMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9yZW5kZXJlci9SZW5kZXJlcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9lbGVtZW50cy9CdXR0b24nO1xyXG5cclxuY29uc3QgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoZG9jdW1lbnQpO1xyXG5cclxuY29uc3QgYXBwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFwcC1jb250YWluZXInKTtcclxuXHJcbmNvbnN0IGJ1dHRvbiA9IG5ldyBCdXR0b24oKTtcclxuYnV0dG9uLnNldENoaWxkcmVuKFwiaGVsbG8gd29ybGRcIik7XHJcbnJlbmRlcmVyLnJlbmRlcihhcHBDb250YWluZXIsIGJ1dHRvbik7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NsaWVudC9tYWluLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _RenderedNode = __webpack_require__(2);\n\nvar _RenderedNode2 = _interopRequireDefault(_RenderedNode);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Renderer = function () {\n\t_createClass(Renderer, null, [{\n\t\tkey: 'createRenderer',\n\t\tvalue: function createRenderer(document) {\n\t\t\treturn new Renderer(document);\n\t\t}\n\t}]);\n\n\tfunction Renderer(document) {\n\t\t_classCallCheck(this, Renderer);\n\n\t\tthis.document = document;\n\t\tthis.renderedNodes = new Map();\n\t}\n\n\t_createClass(Renderer, [{\n\t\tkey: 'render',\n\t\tvalue: function render(documentNode, element) {\n\t\t\tif (!documentNode) {\n\t\t\t\tthrow new Error('Invalid documentNode ' + documentNode + ', node must be provided');\n\t\t\t}\n\t\t\tvar domElement = this.createOrUpdate(element);\n\t\t\tdocumentNode.appendChild(domElement);\n\t\t}\n\t}, {\n\t\tkey: 'createOrUpdate',\n\t\tvalue: function createOrUpdate(element, index) {\n\t\t\tvar renderedNode = null;\n\t\t\tif (this.renderedNodes.has(element)) {\n\t\t\t\trenderedNode = this.renderedNodes.get(element);\n\t\t\t} else {\n\t\t\t\trenderedNode = this.create(element);\n\t\t\t}\n\n\t\t\trenderedNode.syncProps();\n\t\t\tthis.updateChildren(renderedNode, element);\n\n\t\t\treturn renderedNode;\n\t\t}\n\t}, {\n\t\tkey: 'create',\n\t\tvalue: function create(element) {\n\t\t\tvar node = this.document.createElement(element.getTagName());\n\t\t\treturn new _RenderedNode2.default(node, element);\n\t\t}\n\t}, {\n\t\tkey: 'updateChildren',\n\t\tvalue: function updateChildren(renderedNode, element) {\n\t\t\tvar _this = this;\n\n\t\t\tvar children = element.getChildren();\n\t\t\tif (!children) {\n\t\t\t\tchildren = [];\n\t\t\t}\n\t\t\tif (typeof children === 'string') {\n\t\t\t\tchildren = [children];\n\t\t\t}\n\t\t\tvar renderedChildren = children.map(function (childElement, index) {\n\t\t\t\treturn _this.createOrUpdate(childElement, index);\n\t\t\t});\n\n\t\t\trenderedNode.syncChildren(renderedChildren);\n\t\t}\n\t}]);\n\n\treturn Renderer;\n}();\n\nexports.default = Renderer;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2xpZW50L3JlbmRlcmVyL1JlbmRlcmVyLmpzP2FmYWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbmRlcmVkTm9kZSBmcm9tICcuL1JlbmRlcmVkTm9kZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciB7XHJcblx0c3RhdGljIGNyZWF0ZVJlbmRlcmVyKGRvY3VtZW50KSB7XHJcblx0XHRyZXR1cm4gbmV3IFJlbmRlcmVyKGRvY3VtZW50KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRvY3VtZW50KSB7XHJcblx0XHR0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XHJcblx0XHR0aGlzLnJlbmRlcmVkTm9kZXMgPSBuZXcgTWFwKCk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoZG9jdW1lbnROb2RlLCBlbGVtZW50KSB7XHJcblx0XHRpZiAoIWRvY3VtZW50Tm9kZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZG9jdW1lbnROb2RlICR7ZG9jdW1lbnROb2RlfSwgbm9kZSBtdXN0IGJlIHByb3ZpZGVkYCk7XHJcblx0XHR9XHJcblx0XHRjb25zdCBkb21FbGVtZW50ID0gdGhpcy5jcmVhdGVPclVwZGF0ZShlbGVtZW50KTtcclxuXHRcdGRvY3VtZW50Tm9kZS5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZU9yVXBkYXRlKGVsZW1lbnQsIGluZGV4KSB7XHJcblx0XHRsZXQgcmVuZGVyZWROb2RlID0gbnVsbDtcclxuXHRcdGlmICh0aGlzLnJlbmRlcmVkTm9kZXMuaGFzKGVsZW1lbnQpKSB7XHJcblx0XHRcdHJlbmRlcmVkTm9kZSA9IHRoaXMucmVuZGVyZWROb2Rlcy5nZXQoZWxlbWVudCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW5kZXJlZE5vZGUgPSB0aGlzLmNyZWF0ZShlbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlZE5vZGUuc3luY1Byb3BzKCk7XHJcblx0XHR0aGlzLnVwZGF0ZUNoaWxkcmVuKHJlbmRlcmVkTm9kZSwgZWxlbWVudCk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmVkTm9kZTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZShlbGVtZW50KSB7XHJcblx0XHRjb25zdCBub2RlID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQuZ2V0VGFnTmFtZSgpKTtcclxuXHRcdHJldHVybiBuZXcgUmVuZGVyZWROb2RlKG5vZGUsIGVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlQ2hpbGRyZW4ocmVuZGVyZWROb2RlLCBlbGVtZW50KSB7XHJcblx0XHRsZXQgY2hpbGRyZW4gPSBlbGVtZW50LmdldENoaWxkcmVuKCk7XHJcblx0XHRpZiAoIWNoaWxkcmVuKSB7XHJcblx0XHRcdGNoaWxkcmVuID0gW107XHJcblx0XHR9XHJcblx0XHRpZiAodHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRjaGlsZHJlbiA9IFtjaGlsZHJlbl07XHJcblx0XHR9XHJcblx0XHRjb25zdCByZW5kZXJlZENoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZEVsZW1lbnQsIGluZGV4KSA9PiB0aGlzLmNyZWF0ZU9yVXBkYXRlKGNoaWxkRWxlbWVudCwgaW5kZXgpKTtcclxuXHJcblx0XHRyZW5kZXJlZE5vZGUuc3luY0NoaWxkcmVuKHJlbmRlcmVkQ2hpbGRyZW4pO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jbGllbnQvcmVuZGVyZXIvUmVuZGVyZXIuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBaERBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _PropList = __webpack_require__(3);\n\nvar _PropList2 = _interopRequireDefault(_PropList);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar RenderedNode = function () {\n\tfunction RenderedNode(node, element) {\n\t\t_classCallCheck(this, RenderedNode);\n\n\t\tthis.element = element;\n\t\tthis.node = node;\n\t\tthis.currentProperties = new _PropList2.default();\n\t\tthis.childrenByKey = new Map();\n\t}\n\n\t_createClass(RenderedNode, [{\n\t\tkey: 'getChildByKey',\n\t\tvalue: function getChildByKey(key) {\n\t\t\treturn this.childrenByKey.get(key);\n\t\t}\n\t}, {\n\t\tkey: 'setChildByKey',\n\t\tvalue: function setChildByKey(key, renderedNode) {\n\t\t\tthis.childrenByKey.set(key, renderedNode);\n\t\t}\n\t}, {\n\t\tkey: 'syncProps',\n\t\tvalue: function syncProps() {\n\t\t\tvar _this = this;\n\n\t\t\tvar currentProperties = this.currentProperties;\n\t\t\tvar newProperties = this.element.getProperties();\n\n\t\t\tvar addedProperties = newProperties.subtract(currentProperties);\n\t\t\tvar removedProperties = currentProperties.subtract(newProperties);\n\t\t\tvar sameProperties = newProperties.intersect(currentProperties);\n\n\t\t\taddedProperties.forEach(function (property, value) {\n\t\t\t\t_this.node[property] = value;\n\t\t\t});\n\n\t\t\tremovedProperties.forEach(function (property, value) {\n\t\t\t\tdelete _this.node[property];\n\t\t\t});\n\n\t\t\tsameProperties.forEach(function (property, value) {\n\t\t\t\tvar oldValue = value;\n\t\t\t\tvar newValue = _this.element.getProperty(property);\n\t\t\t\tif (oldValue !== newValue) {\n\t\t\t\t\t_this.node[property] = newValue;\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t}]);\n\n\treturn RenderedNode;\n}();\n\nexports.default = RenderedNode;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2xpZW50L3JlbmRlcmVyL1JlbmRlcmVkTm9kZS5qcz84NzI3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wTGlzdCBmcm9tICcuLi9lbGVtZW50cy91dGlscy9Qcm9wTGlzdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlZE5vZGUge1xyXG5cdGNvbnN0cnVjdG9yKG5vZGUsIGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLm5vZGUgPSBub2RlO1xyXG5cdFx0dGhpcy5jdXJyZW50UHJvcGVydGllcyA9IG5ldyBQcm9wTGlzdCgpO1xyXG5cdFx0dGhpcy5jaGlsZHJlbkJ5S2V5ID0gbmV3IE1hcCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0Q2hpbGRCeUtleShrZXkpIHtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuQnlLZXkuZ2V0KGtleSk7XHJcblx0fVxyXG5cclxuXHRzZXRDaGlsZEJ5S2V5KGtleSwgcmVuZGVyZWROb2RlKSB7XHJcblx0XHR0aGlzLmNoaWxkcmVuQnlLZXkuc2V0KGtleSwgcmVuZGVyZWROb2RlKTtcclxuXHR9XHJcblxyXG5cdHN5bmNQcm9wcygpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnRQcm9wZXJ0aWVzID0gdGhpcy5jdXJyZW50UHJvcGVydGllcztcclxuXHRcdGNvbnN0IG5ld1Byb3BlcnRpZXMgPSB0aGlzLmVsZW1lbnQuZ2V0UHJvcGVydGllcygpO1xyXG5cclxuXHRcdGNvbnN0IGFkZGVkUHJvcGVydGllcyA9IG5ld1Byb3BlcnRpZXMuc3VidHJhY3QoY3VycmVudFByb3BlcnRpZXMpO1xyXG5cdFx0Y29uc3QgcmVtb3ZlZFByb3BlcnRpZXMgPSBjdXJyZW50UHJvcGVydGllcy5zdWJ0cmFjdChuZXdQcm9wZXJ0aWVzKTtcclxuXHRcdGNvbnN0IHNhbWVQcm9wZXJ0aWVzID0gbmV3UHJvcGVydGllcy5pbnRlcnNlY3QoY3VycmVudFByb3BlcnRpZXMpO1xyXG5cclxuXHRcdGFkZGVkUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcclxuXHRcdFx0dGhpcy5ub2RlW3Byb3BlcnR5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmVtb3ZlZFByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHksIHZhbHVlKSA9PiB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLm5vZGVbcHJvcGVydHldO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2FtZVByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHksIHZhbHVlKSA9PiB7XHJcblx0XHRcdGNvbnN0IG9sZFZhbHVlID0gdmFsdWU7XHJcblx0XHRcdGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lbGVtZW50LmdldFByb3BlcnR5KHByb3BlcnR5KTtcclxuXHRcdFx0aWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xyXG5cdFx0XHRcdHRoaXMubm9kZVtwcm9wZXJ0eV0gPSBuZXdWYWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NsaWVudC9yZW5kZXJlci9SZW5kZXJlZE5vZGUuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBdkNBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar PropList = function () {\n\tfunction PropList() {\n\t\t_classCallCheck(this, PropList);\n\n\t\tthis.properties = new Map();\n\t}\n\n\t_createClass(PropList, [{\n\t\tkey: \"getProperty\",\n\t\tvalue: function getProperty(key) {\n\t\t\treturn this.properties.get(key);\n\t\t}\n\t}, {\n\t\tkey: \"setProperty\",\n\t\tvalue: function setProperty(key, value) {\n\t\t\tthis.properties.set(key, value);\n\t\t}\n\t}, {\n\t\tkey: \"hasProperty\",\n\t\tvalue: function hasProperty(key) {\n\t\t\treturn this.properties.has(key);\n\t\t}\n\t}, {\n\t\tkey: \"getPropertyKeys\",\n\t\tvalue: function getPropertyKeys() {\n\t\t\tvar propertiesKeys = [];\n\t\t\tthis.properties.forEach(function (value, key) {\n\t\t\t\tpropertiesKeys.push(key);\n\t\t\t});\n\t\t\treturn propertiesKeys;\n\t\t}\n\t}, {\n\t\tkey: \"subtract\",\n\t\tvalue: function subtract(otherPropList) {\n\t\t\tvar _this = this;\n\n\t\t\tvar difference = new PropList();\n\t\t\tthis.getPropertyKeys().forEach(function (key) {\n\t\t\t\tif (!otherPropList.has(key)) {\n\t\t\t\t\tdifference.setProperty(key, _this.getProperty(key));\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn difference;\n\t\t}\n\t}, {\n\t\tkey: \"intersect\",\n\t\tvalue: function intersect(otherPropList) {\n\t\t\tvar _this2 = this;\n\n\t\t\tvar difference = new PropList();\n\t\t\tthis.getPropertyKeys().forEach(function (key) {\n\t\t\t\tif (otherPropList.has(key)) {\n\t\t\t\t\tdifference.setProperty(key, _this2.getProperty(key));\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn difference;\n\t\t}\n\t}, {\n\t\tkey: \"forEach\",\n\t\tvalue: function forEach(callback) {\n\t\t\tthis.properties.forEach(callback);\n\t\t}\n\t}]);\n\n\treturn PropList;\n}();\n\nexports.default = PropList;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2xpZW50L2VsZW1lbnRzL3V0aWxzL1Byb3BMaXN0LmpzP2U2M2MiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvcExpc3Qge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5wcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0UHJvcGVydHkoa2V5KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wZXJ0aWVzLmdldChrZXkpO1xyXG5cdH1cclxuXHJcblx0c2V0UHJvcGVydHkoa2V5LCB2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wZXJ0aWVzLnNldChrZXksIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGhhc1Byb3BlcnR5KGtleSkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcGVydGllcy5oYXMoa2V5KTtcclxuXHR9XHJcblxyXG5cdGdldFByb3BlcnR5S2V5cygpIHtcclxuXHRcdGNvbnN0IHByb3BlcnRpZXNLZXlzID0gW107XHJcblx0XHR0aGlzLnByb3BlcnRpZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRwcm9wZXJ0aWVzS2V5cy5wdXNoKGtleSk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBwcm9wZXJ0aWVzS2V5cztcclxuXHR9XHJcblxyXG5cdHN1YnRyYWN0KG90aGVyUHJvcExpc3QpIHtcclxuXHRcdGNvbnN0IGRpZmZlcmVuY2UgPSBuZXcgUHJvcExpc3QoKTtcclxuXHRcdHRoaXMuZ2V0UHJvcGVydHlLZXlzKClcclxuXHRcdFx0LmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0XHRpZiAoIW90aGVyUHJvcExpc3QuaGFzKGtleSkpIHtcclxuXHRcdFx0XHRcdGRpZmZlcmVuY2Uuc2V0UHJvcGVydHkoa2V5LCB0aGlzLmdldFByb3BlcnR5KGtleSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRyZXR1cm4gZGlmZmVyZW5jZTtcclxuXHR9XHJcblxyXG5cdGludGVyc2VjdChvdGhlclByb3BMaXN0KSB7XHJcblx0XHRjb25zdCBkaWZmZXJlbmNlID0gbmV3IFByb3BMaXN0KCk7XHJcblx0XHR0aGlzLmdldFByb3BlcnR5S2V5cygpXHJcblx0XHRcdC5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdFx0aWYgKG90aGVyUHJvcExpc3QuaGFzKGtleSkpIHtcclxuXHRcdFx0XHRcdGRpZmZlcmVuY2Uuc2V0UHJvcGVydHkoa2V5LCB0aGlzLmdldFByb3BlcnR5KGtleSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRyZXR1cm4gZGlmZmVyZW5jZTtcclxuXHR9XHJcblxyXG5cdGZvckVhY2goY2FsbGJhY2spIHtcclxuXHRcdHRoaXMucHJvcGVydGllcy5mb3JFYWNoKGNhbGxiYWNrKTtcclxuXHR9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY2xpZW50L2VsZW1lbnRzL3V0aWxzL1Byb3BMaXN0LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQWpEQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _SimpleElement = __webpack_require__(5);\n\nvar _SimpleElement2 = _interopRequireDefault(_SimpleElement);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Button = _SimpleElement2.default.createSimpleElementClass('button');\nexports.default = Button;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2xpZW50L2VsZW1lbnRzL0J1dHRvbi5qcz9kYTczIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaW1wbGVFbGVtZW50IGZyb20gJy4vU2ltcGxlRWxlbWVudCc7XG5cbmNvbnN0IEJ1dHRvbiA9IFNpbXBsZUVsZW1lbnQuY3JlYXRlU2ltcGxlRWxlbWVudENsYXNzKCdidXR0b24nKTtcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jbGllbnQvZWxlbWVudHMvQnV0dG9uLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBOzs7OztBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _BaseElement2 = __webpack_require__(6);\n\nvar _BaseElement3 = _interopRequireDefault(_BaseElement2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar SimpleElement = function () {\n\tfunction SimpleElement() {\n\t\t_classCallCheck(this, SimpleElement);\n\t}\n\n\t_createClass(SimpleElement, null, [{\n\t\tkey: 'createSimpleElementClass',\n\t\tvalue: function createSimpleElementClass(tagName) {\n\t\t\treturn function (_BaseElement) {\n\t\t\t\t_inherits(_class, _BaseElement);\n\n\t\t\t\tfunction _class() {\n\t\t\t\t\t_classCallCheck(this, _class);\n\n\t\t\t\t\treturn _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, tagName));\n\t\t\t\t}\n\n\t\t\t\treturn _class;\n\t\t\t}(_BaseElement3.default);\n\t\t}\n\t}]);\n\n\treturn SimpleElement;\n}();\n\nexports.default = SimpleElement;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2xpZW50L2VsZW1lbnRzL1NpbXBsZUVsZW1lbnQuanM/MTUzYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSAnLi9CYXNlRWxlbWVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVFbGVtZW50IHtcclxuXHRzdGF0aWMgY3JlYXRlU2ltcGxlRWxlbWVudENsYXNzKHRhZ05hbWUpIHtcclxuXHRcdHJldHVybiBjbGFzcyBleHRlbmRzIEJhc2VFbGVtZW50IHtcclxuXHRcdFx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRcdFx0c3VwZXIodGFnTmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NsaWVudC9lbGVtZW50cy9TaW1wbGVFbGVtZW50LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUpBO0FBQUE7QUFLQTs7Ozs7O0FBUEEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _PropList = __webpack_require__(3);\n\nvar _PropList2 = _interopRequireDefault(_PropList);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar BaseElement = function () {\n\tfunction BaseElement(tagName) {\n\t\t_classCallCheck(this, BaseElement);\n\n\t\tif (!tagName) {\n\t\t\tthrow new Error('Invalid tagName \\'' + tagName);\n\t\t}\n\t\tthis.tagName = tagName;\n\t\tthis.children = null;\n\t\tthis.properties = new _PropList2.default();\n\t}\n\n\t_createClass(BaseElement, [{\n\t\tkey: 'getTagName',\n\t\tvalue: function getTagName() {\n\t\t\treturn this.tagName;\n\t\t}\n\t}, {\n\t\tkey: 'setProperty',\n\t\tvalue: function setProperty(objectOrKey, value) {\n\t\t\tvar _this = this;\n\n\t\t\t// Can't be a falsy value\n\t\t\tif (!objectOrKey) {\n\t\t\t\tthrow new Error('Can not setProperty with a null key');\n\t\t\t}\n\n\t\t\tif ((typeof objectOrKey === 'undefined' ? 'undefined' : _typeof(objectOrKey)) === 'object') {\n\t\t\t\t(function () {\n\t\t\t\t\tvar properties = objectOrKey;\n\t\t\t\t\tObject.keys(objectOrKey).forEach(function (key) {\n\t\t\t\t\t\t_this.setProperty(key, properties[key]);\n\t\t\t\t\t});\n\t\t\t\t})();\n\t\t\t} else if (typeof objectOrKey === 'string') {\n\t\t\t\tvar key = objectOrKey;\n\t\t\t\tthis.properties.setProperty(key, value);\n\t\t\t} else {\n\t\t\t\tthrow new Error('Invalid parameter type ' + (typeof objectOrKey === 'undefined' ? 'undefined' : _typeof(objectOrKey)));\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'getProperty',\n\t\tvalue: function getProperty(key) {\n\t\t\treturn this.properties.getProperty(key);\n\t\t}\n\t}, {\n\t\tkey: 'getProperties',\n\t\tvalue: function getProperties() {\n\t\t\treturn this.properties;\n\t\t}\n\t}, {\n\t\tkey: 'setChildren',\n\t\tvalue: function setChildren(children) {\n\t\t\tif (!Array.isArray(children) && children !== null && typeof children !== 'string') {\n\t\t\t\tthrow new Error('Children must be an array, got ' + children);\n\t\t\t}\n\t\t\tthis.children = children;\n\t\t}\n\t}, {\n\t\tkey: 'getChildren',\n\t\tvalue: function getChildren() {\n\t\t\treturn this.children;\n\t\t}\n\t}]);\n\n\treturn BaseElement;\n}();\n\nexports.default = BaseElement;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2xpZW50L2VsZW1lbnRzL0Jhc2VFbGVtZW50LmpzPzAwMDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BMaXN0IGZyb20gJy4vdXRpbHMvUHJvcExpc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcblx0XHRpZiAoIXRhZ05hbWUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0YWdOYW1lICcke3RhZ05hbWV9YCk7XG5cdFx0fVxuXHRcdHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IG51bGw7XG5cdFx0dGhpcy5wcm9wZXJ0aWVzID0gbmV3IFByb3BMaXN0KCk7XG5cdH1cblxuXHRnZXRUYWdOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLnRhZ05hbWU7XG5cdH1cblxuXHRzZXRQcm9wZXJ0eShvYmplY3RPcktleSwgdmFsdWUpIHtcblx0XHQvLyBDYW4ndCBiZSBhIGZhbHN5IHZhbHVlXG5cdFx0aWYgKCFvYmplY3RPcktleSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IHNldFByb3BlcnR5IHdpdGggYSBudWxsIGtleScpO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0T3JLZXkgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRjb25zdCBwcm9wZXJ0aWVzID0gb2JqZWN0T3JLZXk7XG5cdFx0XHRPYmplY3Qua2V5cyhvYmplY3RPcktleSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHR0aGlzLnNldFByb3BlcnR5KGtleSwgcHJvcGVydGllc1trZXldKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdE9yS2V5ID09PSAnc3RyaW5nJykge1xuXHRcdFx0Y29uc3Qga2V5ID0gb2JqZWN0T3JLZXk7XG5cdFx0XHR0aGlzLnByb3BlcnRpZXMuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXJhbWV0ZXIgdHlwZSAke3R5cGVvZiBvYmplY3RPcktleX1gKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm9wZXJ0eShrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wZXJ0aWVzLmdldFByb3BlcnR5KGtleSk7XG5cdH1cblxuXHRnZXRQcm9wZXJ0aWVzKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG5cdH1cblxuXHRzZXRDaGlsZHJlbihjaGlsZHJlbikge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4gIT09IG51bGwgJiYgdHlwZW9mIGNoaWxkcmVuICE9PSAnc3RyaW5nJykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDaGlsZHJlbiBtdXN0IGJlIGFuIGFycmF5LCBnb3QgJHtjaGlsZHJlbn1gKTtcblx0XHR9XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXHR9XG5cblx0Z2V0Q2hpbGRyZW4oKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW47XG5cdH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY2xpZW50L2VsZW1lbnRzL0Jhc2VFbGVtZW50LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFsREEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);