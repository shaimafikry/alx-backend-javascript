// 2-calcul_chai.test.js

const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', function() {
    describe('SUM', function() {
        it('should return the sum of two rounded numbers', function() {
            const result = calculateNumber('SUM', 1.4, 4.5);
            expect(result).to.equal(6);  // The rounded sum of 1.4 and 4.5
        });
    });

    describe('SUBTRACT', function() {
        it('should return the subtraction of two rounded numbers', function() {
            const result = calculateNumber('SUBTRACT', 1.4, 4.5);
            expect(result).to.equal(-4);  // The rounded subtraction of 1 and 5
        });

        it('should return the correct result when a and b are reversed', function() {
            const result = calculateNumber('SUBTRACT', 3.9, 1.1);
            expect(result).to.equal(3);  // 4 - 1
        });
    });

    describe('DIVIDE', function() {
        it('should return the division of two rounded numbers', function() {
            const result = calculateNumber('DIVIDE', 1.4, 4.5);
            expect(result).to.equal(0.2);  // 1 / 5
        });

        it('should return "Error" when dividing by zero', function() {
            const result = calculateNumber('DIVIDE', 1.4, 0);
            expect(result).to.equal('Error');  // Division by zero case
        });
    });
});
