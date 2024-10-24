const sendPaymentRequestToApi = require('./4-payment');
const Utils = require('./utils');
const sinon = require('sinon');

describe('sendPaymentRequestToApi', () => {
  const { expect } = require('chai');
  
  let stub;
  let spy;

  beforeEach(() => {
    // Stub the Utils.calculateNumber to always return 10
    stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    // Spy on console.log
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    // Restore the stub and spy after each test
    stub.restore();
    spy.restore();
  });

  it('should call Utils.calculateNumber with correct arguments', () => {
    sendPaymentRequestToApi(100, 20);
    
    expect(stub.calledWith('SUM', 100, 20)).to.be.true;
  });

  it('should log the correct message', () => {
    sendPaymentRequestToApi(100, 20);
    
    expect(spy.calledWith('The total is: 10')).to.be.true;
  });
});
