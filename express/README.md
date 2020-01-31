# Express Framework Tutorial

## Why Express ?
Since we can create and manage web servers using the http module why do you think there is a need for a framework like express. To understand that Let us create a server
```
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url == '/') {
        console.log("base url hit")
    } else if(req.url == '/api/customers') {
        console.log("api endpoint hit")
    }
    res.end()
})
server.listen(3000);
```
So as we see as we create multiple routes we would have to add multiple if else statements which will make our code messy and difficult to manage. So a framework lets us add multiple routes while helping us in keeping our code maintainable. We can even separate routes in multiple modules. Like
```
// returns a function
const express = require('express')

// function returns and object app which has functions like put, get, post, delete
const app = express()

app.get("/api/customers", (req, res) => {
    console.log("Customers got");
    res.send(true);
})
app.listen(3000, () => console.log('Sample code working'))
```

So express gives our code a skeleton, a structure.

* Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.
* Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.

Note: In an API call we pass the req and res functions, so if we want to exit the function we use return, and if we want to send response to the client we use ```res.send()```. So inside the call even if we send the response somewhere in the middle and not return there then the remaining code in the call would be executed. 
```
app.post("/api/customer", (req, res) => {
    if(someCondition()) {
        // 400 bad request
        res.status(400).send('Name is required and should be more than 2 characters')
    }
    someFunction()
})
```
So here even though we send the response still someFunction() is executed.

## Nodemon
Nodemon keeps on looking at the changes being made to our server file and restarts the server whenever the file is saved.
```
npm install nodemon
nodemon app.js
```

## Creating first application 

```
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("hello from express js");
})

app.listen('4000')
```
## CRUD Operations
For performing CRUD operations we have the following function in node POST, GET, PUT, DELETE

### Making a GET Request
```
const customers = [
    {
        id: 1,
        name: "Akshay"
    },
    {
        id: 2,
        name: "Rahul"
    },
    {
        id: 3,
        name: "Aman"
    }
]

app.get("/api/customers", (req, res) => {
    console.log("Returning all customers");
    res.send(customers);
})

app.get("/api/customer/:id", (req, res) => {
    console.log(`Returning customer with id = ${req.params.id}`)
    const customer = customers.find((c) => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('The source with the given id is not found')
    }
    console.log(customer)
    res.send(customer)
})
```

## Making a POST request
```

app.post("/api/customer", (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        res.status(400).send('Name is required and should be more than 2 characters')
        //return;
    }
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    }
    console.log(customer)
    customers.push(customer);
    res.send(customer)
})
```

### Making a PUT request
```

app.put("/api/customer/:id", (req, res) => {
    let customer = customers.find((c) => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('The source with the given id is not found')
        return;
    }
    if(!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        res.status(400).send('Name is required and should be more than 2 characters')
        return;
    }
    console.log(customer)
    customer.name = req.body.name;
    res.send(customer)    
})

```

### Making a DELETE request

```
app.delete("/api/customer/:id", (req, res) => {
    let customer = customers.find((c) => c.id === parseInt(req.params.id))
    
    if(!customer) {
        res.status(404).send('The source with the given id is not found')
        return;
    }
    let index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
})

```


## Serving Static Files with Express

```
const express = require('express')
const path = require('path')
const app = express()


app.use('/public', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
    console.log(path.join(__dirname, 'static', 'index.html'));
});
app.listen('3000');
```
index.js
```
<!DOCTYPE html>
<html>

    <head>
        <link rel="stylesheet" href="/public/main.css">
    </head>
    <body>
        <h1>Something</h1>
    </body> 
</html>
```
static/index.html

Now the index.js file has 2 middlewares, Now the question is what are middlewares , we'll cover that in detail later on but for now consider a middleware a function that is called when the domain link in it is called with the specific type of request.
so we have app.get and app.use middlewares in the above code   
The reason for creating the middleware ```app.use('/public', express.static(path.join(__dirname, 'static')));``` can be found out by looking at the index.html file. We need the main.css file in index.html, so we make request to http://localhost:3000/public from there and the middleware app.use returns the location of the file in our directory structure, which saves us from exposing out directory structure in the html file, which could be easily inspected by any user.

## Middlewares

A middleware function is a function that takes a request object and either returns response to the client or passes control to another middleware function
Every route handler function such as get() post(), is an example of middleware function. Another example of a middleware function is ```express.json()```, the job of this middleware function is to process a request and and if there is a json object in the request parse it and set its value to req.body.
Whenever we send a request it goes through a request processing pipeline, which consists of all the middleware functions.
With the help of middleware functions we can perform logging, authentication, authorization on requests etc.

So express application is a bunch of middleware functions.
Node: app.use() is use to add a middleware function to our pipeline, a middleware function if what comes inside of it.

### Custom Middleware Function

```
app.use((req, res, next) => {
    console.log("The request passed the authentication process")
    next()
})

app.use((req, res, next) => {
    console.log("The request passed the authorization process")
    next()
})
```
Request passes through middleware functions in the order in which they are defined
next() is used to pass control to the next file.

### Creating middleware in a separate module
app.js
```
const logger = require('./logger')
app.use(logger)
```

logger.js
```
module.exports = (req, res, next) => {
    console.log("The request is recieved")
    next()
}
```

### Built in middlewares
```

app.use(express.json()) // If the incoming requests contains json object then it parses it
app.use(express.urlencoded({ extended : true })) // If the incoming requests contains urlencoded data then parses it
app.use(express.static('public')) // It helps use server static content, for example static webpages. The the current 
// directory inside the public function whatever is present can be assessed
```
### Custom Middleware functions
There are alot of custom middleware functions that can be found on [express middlewares](http://expressjs.com/en/resources/middleware.html)


## Environments
There must be conditions where we would want to use some middleware only in case of development environmet as it may slow down the request processing pipeline. So we can use environment variables for that purpose.
```
if(process.env.NODE_ENV === 'development') {
    app.use(logger)
}
```
We can also get value of env variable using app.get('env') variable.

## Configurations
we can use one of the packages like rc or config for that.

## Debugging
We can use the debug package for that 
```
npm install debug
```
The major need for it is due to the fact that we have to delete the debug commands, in production and again add them in development, so with debug module we can set a particular env variable to see those particular debugging logs. 
Also we can add namespaces to the type of commands telling for what purpose the given log accounts for.

```
const dbDebug = require('debug')("DEB_DB")
const flowDebug = require('debug')("DEB_FLOW")

dbDebug("debug something")
flowDebug("another thing")
```
run command
```
DEBUG=DEB_DB,DEB_FLOW node test.js
```
So both the debug messages are available in different colors. We can choose to have one type or another or both or none.

## Structuring Express Application

Instead of defining all routes in a single file, we can divide them across files, by using the router in express.
So as per our above example we can define routes pertaining to customers in routes/customer.js like
```
const express = require('express')
const router = express.Router()

let customers = [
    {
        id: 1,
        name: "Akshay"
    },
    {
        id: 2,
        name: "Rahul"
    },
    {
        id: 3,
        name: "Aman"
    }
]

router.get("/", (req, res) => {
    console.log("Returning all customers");
    res.send(customers);
})

router.get("/:id", (req, res) => {
    console.log(`Returning customer with id = ${req.params.id}`)
    const customer = customers.find((c) => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('The source with the given id is not found')
    }
    console.log(customer)
    res.send(customer)
})

router.post("/", (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        res.status(400).send('Name is required and should be more than 2 characters')
        return;
    }
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    }
    console.log(customer)
    customers.push(customer);
    res.send(customer)
})

router.put("/:id", (req, res) => {
    let customer = customers.find((c) => c.id === parseInt(req.params.id))
    
    if(!customer) {
        res.status(404).send('The source with the given id is not found')
        return;
    }
    if(!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        res.status(400).send('Name is required and should be more than 2 characters')
        return;
    }
    console.log(customer)
    customer.name = req.body.name;
    res.send(customer)    
})

router.delete("/:id", (req, res) => {
    let customer = customers.find((c) => c.id === parseInt(req.params.id))
    
    if(!customer) {
        res.status(404).send('The source with the given id is not found')
        return;
    }
    let index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
})

module.exports = router
```

And in our app.js we can write
```
const customersRoute = require('./routes/customer')
app.use('/api/customer', customersRoute);
```