# Asynchronous Javascript

At its base, JavaScript is a synchronous, blocking, single-threaded language. That just means that only one operation can be in progress at a time. That’s not the entire story, though!

What if you have to make an expensive database request? You don’t want to be twiddling your thumbs while PG and Postgres grab those 800 songs you need for your music library. Synchronous code makes a programmer’s life very difficult, so the JavaScript community developed some great workarounds.
When you hear folks say that JavaScript is an asynchronous language, what they mean is that you can manipulate JavaScript to behave in an asynchronous way. It’s not baked in, but it’s possible! Here are a few ways to make that happen like
* Callbacks
* Promises
* Async and Await

And all of that is managed by the event loop. So in short Javascript is synchronous and single threaded, but we can make it work in an asynchronous fashion by using the functionality of the event loop.

## Callbacks
Consider the following code
```

console.log("before")
let user = getUser(5)
console.log(user);
console.log("after")


// Imagine this function to be making a database call and we have to log the result of the call
function getUser(id) {
    let user
    setTimeout(() => {
        console.log("User fount")
        user = {
            id: id,
            name: 'AkshayCHD'
        }
    }, 2000);
    return user
}
```
The output of the above code is 

*OUTPUT* 
before
undefined
after
User fount

So we cannot get the value of the user in this way, as the setTimeout() function is treated as an asynchronous call and is executed by the thread after the execution of other synchronous code.
So to get the value of the user object we implement callbacks.
```
console.log("before")
let user = getUser(5, function(user) {
    console.log(user)
})
console.log("after")

function getUser(id, callback) {
    setTimeout(() => {
        user = {
            id: id,
            name: 'AkshayCHD'
        }
        callback(user);
    }, 2000);
}

```
*OUTPUT*
before
after
{ id: 5, name: 'AkshayCHD' }


![callbacks](https://miro.medium.com/max/1275/1*9iOmFwC3PWUD8RFLsxzBXQ.jpeg)

## Callback Hell
One callback into another, into another gives a nested tree like structure which is difficult to manage
```
function third(data, callback) {
    let value = data;
    value = value + 3;
    setTimeout(() => {
        callback(value)
    }, 1000);
}
function second(data, callback) {
    let value = data;
    value = value + 2;
    setTimeout(() => {
        callback(value)
    }, 1000)
}
function first(data, callback) {
    let value = data;
    value = value + 1;
    setTimeout(()=> {
        callback(value)
    }, 1000)
}

// This tree like nested structure of functions is called a callback hell and is difficult to manage and debug.
first(5, (firstValue) => {
    console.log("value after first", firstValue)
    second(firstValue, (secondValue) => {
        console.log("value after second", secondValue)
        third(secondValue, (thirdValue) => {
            console.log("value after second", thirdValue)
            
        })    
    })
})

```
## Using name functions
It can be a little better than callbacks approach but still not very good
```
// Note here we pass a reference to the function printFirst and not execute the function, it is like putting that //function over there, the above functions first, second, third remain same.

first(5, printFirst)

function printThird(thirdValue) {
    console.log("value after second", thirdValue)
}

function printSecond(secondValue) {
    console.log("value after second", secondValue)
    third(secondValue, printThird)
}

function printFirst(firstValue) {
    console.log("value after first", firstValue)
    second(firstValue, printSecond)
}
```

## Promises
Promise is an object that holds eventual result of an asynchronous object, it basically promises you that it will give you a result of an asynchronous operation.
![promise states](https://miro.medium.com/max/1102/1*oOG6l5t9AV41IjFYrwhI1g.png)

In promises we use the keywords then and catch to look for return values and errors, ```then and catch ``` can be applied to any function that returns a promise. So we can modify our previous code to work with promises like.
Note that before each then call we are returning a promise from the previous function call.
```
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

// Promist uses 2 functions resolve and reject, resolve is called if execution is successful and if not reject is called
first(5).then((firstValue) => {
    console.log("value after first", firstValue)
    return second(firstValue);
}).then((secondValue) => {
    console.log("value after second", secondValue)
    return third(secondValue)
}).then((thirdValue) => {
    console.log("value after second", thirdValue)
}).catch((err) => console.log(new Error(err)))

```

Sometimes we might want to run 2 promises in parallel, and return the result when both of them are executed, so we use Promise.all property, the result is an array, of results of all the individual promises. 
NOTE: Node is still single threaded, here it starts the execution of one promise and then instantaneously starts the execution of the other, and when there results are ready the same thread processes them one after the other, but it seems instantaneous, but it is not actually parallel, it just seems.

```
Promise.all([first(5), second(5)]).then((result) => {
    console.log(result)
})
```
Similarly we can use ```Promise.race()``` for waiting for input from one of the promise.


## Async Await
We can create async functions and use await keyword in them to wait for the resolution of the current promise to move forward with the course. THey are syntactical sugars in node that make asynchronous code look like synchronous
```

const execute = async () => {
    const firstValue = await first(5);
    console.log("value after first", firstValue)
        
    const secondValue = await second(firstValue);
    console.log("value after second", secondValue)
        
    const thirdValue = await third(secondValue);
    console.log("value after second", thirdValue)
}

execute()
```
Even though code looks synchronous but it is not actually synchronous, the single thread switches its execution when it sees await and comes back to it when the promise is resolved.



