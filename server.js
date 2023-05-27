//require the http module to allow access to methods
const http = require('http');

//require read file methods via the fs module
const fs = require('fs');

//require loadash module
const _ = require('lodash');

//create a server: call method to create server
const server = http.createServer((req, res) => {
    
    //lodash capabilities
    const num = _.random(0, 20);
    console.log(num);

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    //get the path client wants to visit
    let path = './views/';
    //loop through all pages
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send html file
    fs.readFile(path, (err, data) => { 
        if(err) {
            console.log(err);
        } else {
            res.write(data);
            res.end;
        }
    });
});

// invole the listen method: 
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});

