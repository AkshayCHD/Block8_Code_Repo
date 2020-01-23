const third = ((data) => new Promise((resolve, reject) => {
    let value = data;
    value = value + 3;
    setTimeout(() => {
        resolve(value)
    }, 1000);
}))
const second = ((data) => new Promise((resolve, reject) => {
    let value = data;
    value = value + 2;
    setTimeout(() => {
        resolve(value)
    }, 1000)
}))
const first = ((data) => new Promise((resolve, reject) => {
    let value = data;
    value = value + 1;
    setTimeout(()=> {
        resolve(value)
    }, 1000)
}))

first(5, (firstValue) => {
    console.log("value after first", firstValue)
    second(firstValue, (secondValue) => {
        console.log("value after second", secondValue)
        third(secondValue, (thirdValue) => {
            console.log("value after second", thirdValue)
            
        })    
    })
})

// Promise uses 2 functions resolve and reject, resolve is called if execution is successful and if not reject is called
// first(5).then((firstValue) => {
//     console.log("value after first", firstValue)
//     return second(firstValue);
// }).then((secondValue) => {
//     console.log("value after second", secondValue)
//     return third(secondValue)
// }).then((thirdValue) => {
//     console.log("value after second", thirdValue)
// }).catch((err) => console.log(new Error(err)))

const execute = async () => {
    const firstValue = await first(5);
    console.log("value after first", firstValue)
        
    const secondValue = await second(firstValue);
    console.log("value after second", secondValue)
        
    const thirdValue = await third(secondValue);
    console.log("value after second", thirdValue)
}

execute()