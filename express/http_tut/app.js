const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url == '/') {
        console.log("base url hit")
        //res.send(true);
    } else if(req.url == '/api/customers') {
        console.log("api endpoint hit")
        //res.send(true)
    }
    res.end()
})
server.listen(3000);