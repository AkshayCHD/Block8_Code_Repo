// returns a function
const express = require('express')

// function returns and object app which has functions like put, get, post, delete
const app = express()

// to enable parsing of json objects in post request
app.use(express.json())

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

app.post("/api/customer", (req, res) => {
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

app.put("/api/customer/:id", (req, res) => {
    console.log("sd**********************************dsfsdf")
    
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

app.listen(3000, () => console.log('Sample code working'))