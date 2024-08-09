# java classes

- start by defining :
```
		class CLass {
		}
```
- adding constructor :   ("this == self") => in python
```
		constructor (test){
			this._test = test
		}
```
- verify the type of attributes during object creation
	 we can make a priv methods to check for types to prevent redundency
	 when checking we use ( type of  === 'name of object')
	 if we coded it like that ( name === String) we here compare the name (STRING) TO THE STRING CONSTRUCTOR not to the type itself

- get and set => both defined with the same name of the attribute, are called without ()
		- set for checking and assigning
		- get for returning the value

- throwing errors:
	- throw new error => as a general condition
	- throw new (error type) => when you are checking for specific error

- (Array.isArry(test)) => for checking if test i an array
- if ( students.some(student=> type of student !== string)) 
		-  checks if any element is not string
		- .every => checks all elemnts
- // eslint-disable-next-line class-methods-use-this => to ignore eslint check for the next line
- (Strict mode and none strict mode){
	 Strict mode is a useful tool in JavaScript for catching common errors, improving code quality, and enforcing best practices. It’s especially recommended for larger projects or when working in a team, as it helps avoid pitfalls that might otherwise go unnoticed.

	 - Benefits of Using Strict Mode
		Eliminates Some Silent Errors: JavaScript normally allows certain errors to fail silently, meaning no error is thrown and the script continues to run. In strict mode, these errors throw exceptions, making it easier to debug.

		Example: Assigning a value to an undeclared variable throws an error in strict mode.

		```
		'use strict';
		x = 3.14;  // Throws a ReferenceError in strict modE
		```

		Prevents Accidental Globals: In non-strict mode, if you assign a value to an undeclared variable, it creates a global variable. In strict mode, this results in an error.

		```
		'use strict';
		function myFunction() {
			y = 5;  // Throws a ReferenceError
		}
		myFunction();
		```
		Disallows Duplicates: Strict mode disallows duplicate parameter names in functions.

		```
		'use strict';
		function myFunction(a, a, b) {  // SyntaxError in strict mode
			return a + b;
		}
		```
		Disables this in Global Context: In non-strict mode, if you use this in the global context, it refers to the global object (e.g., window in browsers). In strict mode, this is undefined in such contexts.

		```
		'use strict';
		function myFunction() {
			return this;  // Returns undefined in strict mode
		}
		console.log(myFunction());
		Restricted eval: The eval() function cannot introduce new variables into the surrounding scope in strict mode.
		```

		```
		'use strict';
		eval("var x = 2");
		console.log(x);  // ReferenceError: x is not defined
		```
		Prohibits with Statement: The with statement is disallowed in strict mode because it can make code unpredictable.

		```
		'use strict';
		with (Math) {  // SyntaxError: Strict mode code may not include a with statement
			x = cos(2);
		}
		```

}

- Abstract class
	An abstract class is a way to define a base class that cannot be instantiated on its own. It provides a common structure and enforces certain methods to be implemented by subclasses. This concept is particularly powerful in object-oriented programming, where it helps organize and structure code.


```
class Animal {
  constructor(name) {
    if (this.constructor === Animal) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.name = name;
  }

  makeSound() {
    throw new Error("Abstract method 'makeSound' must be implemented.");
  }
}

class Dog extends Animal {
  makeSound() {
    return 'Woof! Woof!';
  }
}

class Cat extends Animal {
  makeSound() {
    return 'Meow! Meow!';
  }
}

// Creating instances of subclasses
const dog = new Dog('Rex');
console.log(dog.makeSound()); // Outputs: Woof! Woof!

const cat = new Cat('Whiskers');
console.log(cat.makeSound()); // Outputs: Meow! Meow!

// Trying to create an instance of an abstract class will throw an error
const animal = new Animal('Generic Animal'); // Error: Abstract classes can't be instantiated.

```

- how to check the child classes throw the abstract class?
- to check for implementation of the method at the begining
we do this at the constructor:


```
constructor(sqft) {
	if (typeof sqft !== 'number') {
		throw new TypeError('sqft must be a number');
	}
	// to check if the child has the mesthod or not
	 // Check if the subclass has implemented evacuationWarningMessage
    if (typeof this.evacuationWarningMessage !== 'function') {
      throw new Error("Class extending Building must override evacuationWarningMessage");
	 // another way
	 // Check if the method was overridden
    if (this.evacuationWarningMessage === Building.prototype.evacuationWarningMessage) {
      throw new Error("Class extending Building must override evacuationWarningMessage");
    }
	}
	this._sqft = sqft;
}

```
 -  to exclude the instance of building itself and check for the child only 

```
   if (this.constructor.name !== 'Building' && this.evacuationWarningMessage === Building.prototype.evacuationWarningMessage) {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }

```

- if we want to check for the override, we can thro an error on the method itself, to be thrown if it's not overridden


```
evacuationWarningMessage() {
	// this error hapenes when the child class tries to use this method without overwritting it
	throw new Error('Class extending Building must override evacuationWarningMessage');
}

```
link => <a herf='https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/#symbolspecies'>Metaprogramming</a>
- power of symbol  (Metaprogramming)
	* to get a string represntation of a class like (__str__ in python) we use:

	```
	[Symbol.toStringTag](){
			return ('whatever you want');
	} 
	```

-  to make the return value depends on the type of casting on the class we use symbol.toPrimitive
```
[Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return this._size;
    }
    return this._location;
  }
```
