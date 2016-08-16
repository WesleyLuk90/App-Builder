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