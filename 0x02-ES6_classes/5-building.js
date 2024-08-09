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
