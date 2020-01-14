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