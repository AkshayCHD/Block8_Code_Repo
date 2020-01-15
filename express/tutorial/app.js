// returns a function
const express = require('express')

// function returns and object app which has functions like put, get, post, delete
const app = express()

const dbDebugger = require('debug')('DEBUG_DATABASE')
const flowDebugger = require('debug')('DEBUG_FLOW')
const customersRoute = require('./routes/customer')
const logger = require('./logger')


app.use(express.json()) // If the incoming requests contains json object then it parses it
app.use(express.urlencoded({ extended : true })) // If the incoming requests contains urlencoded data then parses it
app.use(express.static('public')) // It helps use server static content, for example static webpages. The the current directory
                                  //  inside the public function whatever is present can be assessed 
app.use('/api/customer', customersRoute);

if(process.env.NODE_ENV == undefined) {
    app.use(logger)
    dbDebugger("Database Debug")
    flowDebugger("Flow Debugger")
}

app.listen(3000, () => console.log('Sample code working'))