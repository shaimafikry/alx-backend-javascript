// 1-calcul.test.js

const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', function() {
    describe('SUM', function() {
        it('should return the sum of two rounded numbers', function() {
            assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
            assert.strictEqual(calculateNumber('SUM', 1.9, 3.2), 5);
        });
    });

    describe('SUBTRACT', function() {
        it('should return the subtraction of two rounded numbers', function() {
            assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
            assert.strictEqual(calculateNumber('SUBTRACT', 3.9, 1.1), 3);
        });
    });

    describe('DIVIDE', function() {
        it('should return the division of two rounded numbers', function() {
            assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
        });

        it('should return "Error" when dividing by zero', function() {
            assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
        });
    });
});
