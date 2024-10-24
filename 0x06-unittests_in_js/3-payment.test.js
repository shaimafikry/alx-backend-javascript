const sendPaymentRequestToApi = require('./3-payment');
const Utils = require('./utils');
const sinon = require('sinon');
const { expect } = require('chai');

describe('sendPaymentRequestToApi', () => {

  it('should use Utils.calculateNumber', () => {
    const spy = sinon.spy(Utils, 'calculateNumber');
    sendPaymentRequestToApi(100, 20);
    expect(spy.calledWith('SUM', 100, 20)).to.be.true;
    spy.restore();
  });

  it('should fail if Utils.calculateNumber is not called', () => {
    const spy = sinon.spy(Utils, 'calculateNumber');
    
    // Call the function but ensure it does not use Utils.calculateNumber
    // To simulate this, you can temporarily overwrite the function
    Utils.calculateNumber = () => {}; // Overwrite with a no-op function
    
    // Call the function
    sendPaymentRequestToApi(100, 20);

    // Check that the spy was not called
    expect(spy.notCalled).to.be.true;

    // Restore the original function
    spy.restore();
  });
});
