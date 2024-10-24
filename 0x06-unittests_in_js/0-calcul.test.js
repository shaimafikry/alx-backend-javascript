// Tests should be around the “rounded” part
const assert = require('assert');
const  calculateNumber =  require('./0-calcul');
// However, remember that your tests should not only verify what a function is supposed to do, but also the edge cases
describe('math function that return sum of tw number', function() {
  describe('add', function (){
		it('should return 7 when given 2, 5', function() {
			assert.strictEqual(calculateNumber(2, 5), 7);
		});
	});
	describe('add', function (){
		it('should return 5 when given 1.2, 3.7', function() {
			assert.strictEqual(calculateNumber(1.2, 3.7), 5);
		});
	});
	describe('add', function (){
		it('should return 5 when given 1, 3.7', function() {
			assert.strictEqual(calculateNumber(1, 3.7), 5);
		});
	});
	describe('add', function (){
		it('should return 6 when given 1.5, 3.7', function() {
			assert.strictEqual(calculateNumber(1.5, 3.7), 6);
		});
	});
	describe('add', function (){
		it('should return 4 when given 1.2, 3.3', function() {
			assert.strictEqual(calculateNumber(1.2, 3.3), 4);
		});
	});
});
