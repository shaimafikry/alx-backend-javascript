const sendPaymentRequestToApi = require('./3-payment');
const Utils = require('./utils');
const sinon = require('sinon');

describe('sendPaymentRequestToApi', async () => {
  const { expect } = await import('chai');
  
  it('should use Utils.calculateNumber', () => {
    const spy = sinon.spy(Utils, 'calculateNumber');
    sendPaymentRequestToApi(100, 20);
    expect(spy.calledWith('SUM', 100, 20)).to.be.true;
    spy.restore();
  });
});
