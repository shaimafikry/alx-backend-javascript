// Tests should be around the “rounded” part
const assert = require('assert');
const  calculateNumber =  require('./1-calcul');
// However, remember that your tests should not only verify what a function is supposed to do, but also the edge cases
describe('math function that return RESULT of two number based on type', function() {
  describe('#SUM', function (){
		it('should return 7 when given 2, 5', function() {
			assert.strictEqual(calculateNumber('SUM', 2, 5), 7);
		});
		it('should return 5 when given 1.2, 3.7', function() {
			assert.strictEqual(calculateNumber('SUM', 1.2, 3.7), 5);
		});
	});
	describe('#SUBTRACT', function (){
		it('should return 3 when given 7, 3.7', function() {
			assert.strictEqual(calculateNumber('SUBTRACT', 7, 3.7), 3);
		});
	});
	describe('#DIVIDE ', function (){
		it('should return 6 when given 12.2, 2', function() {
			assert.strictEqual(calculateNumber('DIVIDE', 12.2, 2), 6);
		});
		it('should return error when given 1.2, 0', function() {
			assert.strictEqual(calculateNumber('DIVIDE', 1.2, 0), 'ERROR');
		});
	});
});
