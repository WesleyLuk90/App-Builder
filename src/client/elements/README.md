Elements represent html elements. They should all extend BaseElement.

## Interface
```
interface Element { // Implemented by BaseElement
	setProperty({ [string]: string|number|function|boolean })
	setProperty(string key, string|number|function|boolean value)
	getProperty(string key): string|number|function|boolean
	getProperties(): PropList
	setChildren(null|Array<Element>|Element)
	getChildren(): null|Array<Element>|Element
}
```