const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'View', 'index.html'), (err, content) => {
    //         if(err) throw err;

    //         res.writeHead(200, { 'Content-Type': 'text/html'});
    //         res.end(content);
    //     });
    // }

    //Dynamic File Path
    console.log('---------------------------------');
    console.log('Dir name: ', __dirname);
    let filePath = path.join(__dirname, req.url === '/' ?
    'View/index.html' : req.url);

    //Extension of file
    let extName = path.extname(filePath);

    //Initial content type
    let contentType = 'text/html';
    
    //Check ext and set content type
    switch(extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.png':
            contentType = 'image/jpg';
            break;
    }

    // log the filePath
    console.log(filePath);

    //Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code = 'ENOENT') {
                //Page not found
                console.log("ERROR 404, to be fixed l8r");
                res.end();
            }
            else { //Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //Success
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content, 'utf8');
        }

    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.group(`Server running on port ${PORT}`));