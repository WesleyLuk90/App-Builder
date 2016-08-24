Components represent the structure of a page, a component is the binding between the logic and the html. e.g. ButtonComponent contains a Button Element bound to the "save" action

## Naming convetions
Each component has properties? identified by a key. The property returned can either be a static value or a variable. There can also be component groups on components which are components contained inside components. If the component is a normal container by convetion the component group is called 'children'.

## Handling Loop Scopes
Loop scopes should be declared on the child components. We need to do this to know that these components are children. We also need to be able to define which variable is specified in the subscope. The options on the component can let us define which is the scope variable.

Do we actually need to define scoped variables separately from named ones?
