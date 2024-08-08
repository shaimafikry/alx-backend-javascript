// Import the class Currency from 3-currency.js

// Implement a class named Pricing:

// Constructor attributes:
// amount (Number)
// currency (Currency)
// Each attribute must be stored in an “underscore” attribute version (ex: name is stored in _name)
// Implement a getter and setter for each attribute.
// Implement a method named displayFullPrice
// that returns the attributes in the following format amount currency_name (currency_code).
// Implement a static method named convertPrice.
// It should accept two arguments: amount (Number),
// conversionRate (Number). The function should return the amount multiplied by the conversion rate.
import Currency from './3-currency';

export default class Pricing {
  constructor(amount, currency) {
    if (typeof amount !== 'number') {
      throw new TypeError('amount must be number');
    }
    if (!(currency instanceof Currency)) {
      throw new TypeError('Currency must be an instance of Currency.');
    }
    this._amount = amount;
    this._currency = currency;
  }

  get amount() {
    return this._amount;
  }

  set amount(amount) {
    if (typeof amount !== 'number') {
      throw new TypeError('amount must be number');
    }
    this._amount = amount;
  }

  get currency() {
    return this._currency;
  }

  set currency(currency) {
    if (!(currency instanceof Currency)) {
      throw new TypeError('Currency must be an instance of Currency.');
    }
    this._currency = currency;
  }

  static convertPrice(amount, conversionRate) {
    return this._amount * conversionRate;
  }

  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }
}
