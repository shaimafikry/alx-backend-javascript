// Tests should be around the “rounded” part
const assert = require('assert');
const  calculateNumber =  require('./1-calcul');
// However, remember that your tests should not only verify what a function is supposed to do, but also the edge cases
describe('calculateNumber', () => {
  describe('when type is SUM', () => {
    it('it round the first argument', () => {
        assert.equal(calculateNumber('SUM', 1.0, 0), 1);
        assert.equal(calculateNumber('SUM', 1.3, 0), 1);
        assert.equal(calculateNumber('SUM', 1.7, 0), 2);
    });
    
    it('it round the second argument', () => {
        assert.equal(calculateNumber('SUM', 0, 1.0), 1);
        assert.equal(calculateNumber('SUM', 0, 1.3), 1);
        assert.equal(calculateNumber('SUM', 0, 1.7), 2);
    });
    
    it('it should return the right number', () => {
        assert.equal(calculateNumber('SUM', 1.3, 0), 1);
        assert.equal(calculateNumber('SUM', 0, 1.2), 1);
        assert.equal(calculateNumber('SUM', 1.3, 1.3), 2);
        assert.equal(calculateNumber('SUM', 1.7, 1.2), 3);
        assert.equal(calculateNumber('SUM', 1.3, 1.8), 3);
        assert.equal(calculateNumber('SUM', 1.6, 1.8), 4);
    });
  });
});

describe('math function that return RESULT of two number based on type', function() {
	describe('#SUBTRACT', function (){
		it('should return 3 when given 7, 3.7', function() {
			assert.strictEqual(calculateNumber('SUBTRACT', 7, 3.7), 3);
		});
	});
});

describe('math function that return RESULT of two number based on type', function() {
	describe('#DIVIDE ', function (){
		it('should return 6 when given 12.2, 2', function() {
			assert.strictEqual(calculateNumber('DIVIDE', 12.2, 2), 6);
		});
		it('should return error when given 1.2, 0', function() {
			assert.strictEqual(calculateNumber('DIVIDE', 1.2, 0), 'ERROR');
		});
	});
});
