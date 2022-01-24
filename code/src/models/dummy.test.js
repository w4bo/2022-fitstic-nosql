const dummy = require('./dummy');

test('adds 1 and 2 to equal 3', () => {
    expect(dummy.sum(1, 2)).toBe(3);
});

test('subtracts 1 and 2 to equal -1', () => {
    expect(dummy.subtract(1, 2)).toBe(-1);
});

test('multiplies 1 and 2 to equal 2', () => {
    expect(dummy.multiply(1, 2)).toBe(2);
});