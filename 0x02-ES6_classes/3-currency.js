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
