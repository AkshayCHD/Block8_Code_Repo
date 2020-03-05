const { add, subtract, multiply, divide, promiseFunction } = require('./index.js')

test('Subtract sums test', () => {
    expect(subtract(2, 2)).toBe(0)
})

test('Multiply sums test', () => {
    expect(multiply(2, 2)).toBe(4)
})

test('Divide sums test', () => {
    expect(divide(2, 2)).toBe(1)
})

test('Adding sums test 1', () => {
    expect(add(2, 2)).not.toBe(1)
})

test('Adding sums test', () => {
    expect(add(2, 2)).toBe(4)
})

test('Promise resolve test', async () => {
    let result = await promiseFunction(1) 
    expect(result).toBe(5)
})

test('Promise reject test 1', () => {
    return expect(promiseFunction(0)).rejects.toThrow('Wrong value entered') 
})

test('Promise reject test 2', () => {
    return expect(promiseFunction()).rejects.toThrow('Wrong value entered') 
})
