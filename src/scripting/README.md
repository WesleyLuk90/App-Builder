Use $ as a reserved character

Are there other types of scopes besides loops?

Have to be careful of circular loops

```
{
	variables: [
		{ name: teacher, type: type(teacher) },
		{ name: teacherName, type: string, bindTo: "teacher.name" },
		{ name: teacherStudents, type: array<type(student)>, bindTo: "teacher.students" },
		{ name: firstStudent, type: type(student), bindTo: "teacherStudents[0]" }
	],
	scopes: {
		loop1: {
			foreach: 'teacherStudents',
			as: 'mystudent',
		}
	}
}
```

Bindings

e.g. teacher and teacherName

When does teacher notify teacherName
* Teacher is replaced so teacherName can get the updated value

When does teacherName notify teacher
* On ever change (new name is sent to teacher)

e.g. teacherStudents and firstStudent

teacherStudents notifies firstStudent on any mutation
* A change to the order or values in the array affects any computed value of firstStudnet

firstStudent notifies teacherStudents on any mutation
* A change to firstStudent can modify any value computed from teacherStudents e.g. Change the first students marks affects the average mark of all students

## ChangeTokens

Change tokens are used to strictly enforce that each change to a value can not cause an infinite loop of variables updating each other

# Naming Convetions for variables/scopes

* A variable name/scope name is in the form ['part1', 'part2', 'part3', ...]
* A variable local name/scope local name is in the form 'lastpart'
* A variable path/scope path is in the form Path.newPath(['part1', 'part2', 'part3', ...])