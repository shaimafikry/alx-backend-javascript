// Import Car from 10-car.js.

// Implement a class named EVCar that extends the Car class:

// Constructor attributes:
// brand (String)
// motor (String)
// color (String)
// range (String)
// Each attribute must be stored in an “underscore” attribute version (ex: name is stored in _name)
// For privacy reasons, when cloneCar is called
// on a EVCar object, the object returned should be an instance of Car instead of EVCar.
import Car from './10-car';

export default class EVCar {
  constructor(brand, motor, color, range) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
    this._range = range;
  }

  // eslint-disable-next-line class-methods-use-this
  cloneCar() {
    return new Car();
  }
}
