const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const promiseFunction = (val) => new Promise((resolve, reject) => {
    if(val == 1) {
        resolve(5)
    } else {
        reject(new Error('Wrong value entered'))
    }
})

module.exports = { add, subtract, multiply, divide, promiseFunction }
