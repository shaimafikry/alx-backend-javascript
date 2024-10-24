// spies and sinon
const Utils = require('./utils');

function sendPaymentRequestToApi (totalAmount, totalShipping) {
	const data = Utils.calculateNumber('SUM', totalAmount, totalShipping);

	console.log(`The total is: ${data}`);
};


module.exports = sendPaymentRequestToApi;
