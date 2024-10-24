import sendPaymentRequestToApi from './3-payment.js';
import Utils from './utils.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('sendPaymentRequestToApi', () => {
  let spy;
  // specifiy what to spy on
  beforeEach(() => {
    spy = sinon.spy(Utils, 'calculateNumber');
  });
  // clear spy ater test
  afterEach(() => {
    spy.restore();
  });
  // call function
  it('should call Utils.calculateNumber with correct arguments', () => {
    sendPaymentRequestToApi(100, 20);
    expect(spy.calledOnce).to.be.true;

    // check calling
    expect(spy.calledWith('SUM', 100, 20)).to.be.true;
  });

  it('should fail if Utils.calculateNumber is not called', () => {
    //no calling
    expect(spy.notCalled).to.be.true;
  });
});
