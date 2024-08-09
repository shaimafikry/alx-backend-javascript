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
