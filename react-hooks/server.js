const express = require('express')
const app = express();

app.get('/endpoint', (req, res) => {
    console.log("endpoint hit");
    res.send("This is response")
})

app.listen(5000, () => {
    console.log("server started")
})