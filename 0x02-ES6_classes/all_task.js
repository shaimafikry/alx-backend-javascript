export default class ClassRoom {
    constructor(maxStudentsSize) {
      this._maxStudentsSize = maxStudentsSize;
    }
  }

  export default function initializeRooms() {
    const classList = [];
    classList.push(new ClassRoom(19));
    classList.push(new ClassRoom(20));
    classList.push(new ClassRoom(34));
    return classList;
  }


	export default class HolbertonCourse {
		constructor(name, length, students) {
			if (typeof name !== 'string') {
				throw new TypeError('Name must be a string');
			}
	
			if (typeof length !== 'number') {
				throw new TypeError('Length must be a number');
			}
	
			if (!Array.isArray(students)) {
				throw new TypeError('students must be a array of strings');
			}
			this._name = name;
			this._length = length;
			this._students = students;
		}
	
		get name() {
			return this._name;
		}
	
		set name(name) {
			if (typeof name !== 'string') {
				throw new TypeError('Name must be a string');
			}
			this._name = name;
		}
	
		get length() {
			return this._length;
		}
	
		set length(length) {
			if (typeof length !== 'number') {
				throw new TypeError('Length must be a number');
			}
			this._length = length;
		}
	
		get students() {
			return this._students;
		}
	
		set students(students) {
			if (!Array.isArray(students)) {
				throw new TypeError('students must be a array of strings');
			}
			this._students = students;
		}
	
	}
	
	// Implement a class named Currency:

// - Constructor attributes:
// code (String)
// name (String)
// Each attribute must be stored in an “underscore” attribute version (ex: name is stored in _name)
// Implement a getter and setter for each attribute.
// Implement a method named displayFullCurrency that will return the attributes in the following
// format name (code).
export default class Currency {
  constructor(code, name) {
    this._checkType(name);
    this._checkType(code);
    this._code = code;
    this._name = name;
  }

  // eslint-disable-next-line class-methods-use-this
  _checkType(data) {
    if (typeof data !== 'string') {
      throw new TypeError(`${data} must be string.`);
    }
  }

  set name(name) {
    this._checkType(name);
    this._name = name;
  }

  set code(code) {
    this._checkType(code);
    this._code = code;
  }

  get code() {
    return this._code;
  }

  get name() {
    return this.name;
  }

  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
// Implement a class named Building:
// Constructor attributes:
// sqft (Number)
// Each attribute must be stored in an “underscore” attribute version (ex: name is stored in _name)
// Implement a getter for each attribute.
// Consider this class as an abstract class. And make sure that any class
// that extends from it should implement a method named evacuationWarningMessage.
// If a class that extends from it does not have a evacuationWarningMessage method,
// throw an error with the message Class extending Building must override evacuationWarningMessage
export default class Building {
  constructor(sqft) {
    // console.log(this.constructor.name);
    if (typeof sqft !== 'number') {
      throw new TypeError('sqft must be a number');
    }
    // to check if the child has the method or not
    // check first if i am not in the building itself
    // then check for th method
    if (this.constructor.name !== 'Building' && this.evacuationWarningMessage === Building.prototype.evacuationWarningMessage) {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }
    this._sqft = sqft;
  }

  get sqft() {
    return this._sqft;
  }

  set sqft(sqft) {
    if (typeof sqft !== 'number') {
      throw new TypeError('sqft must be a number');
    }
    this._sqft = sqft;
  }

// eslint-disable-next-line class-methods-use-this
// evacuationWarningMessage() {
// this error hapenes when the child class tries to use this method without overwritting it
// throw new Error('Class extending Building must override evacuationWarningMessage');
//   }
}

// Import Building from 5-building.js.
// Implement a class named SkyHighBuilding that extends from Building:
// Constructor attributes:
// sqft (Number) (must be assigned to the parent class Building)
// floors (Number)
// Each attribute must be stored in an “underscore” attribute version (ex: name is stored in _name)
// Implement a getter for each attribute.
// Override the method named evacuationWarningMessage and
// return the following string Evacuate slowly the NUMBER_OF_FLOORS floors.
import Building from './5-building';

export default class SkyHighBuilding extends Building {
  constructor(sqft, floors) {
    super(sqft);
    if (typeof floors !== 'number') {
      throw new TypeError('floor must be a number');
    }
    this._floors = floors;
  }

  get floors() {
    return this._floors;
  }

  set floors(floors) {
    if (typeof floor !== 'number') {
      throw new TypeError('floor must be a number');
    }
    this._floors = floors;
  }

  evacuationWarningMessage() {
    return (`Evacuate slowly the ${this._floors} floors`);
  }
}
