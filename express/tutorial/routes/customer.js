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
