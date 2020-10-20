const { read } = require('fs');
const http = require('http');
const hostname = '127.0.0.1'; 
const port = 8081;  
const { readFile } = require('fs').promises;
const path = require('path');
const { Item } = require('../models');


const server = http.createServer(async (req, res) => {
    if (req.url.match(/^\/images/)) {
        try {
        const imageFilePath = './assets' + req.url;
        const fileExtension = await path.extname(imageFilePath);
        const imageFileContents = await readFile(imageFilePath);
        const imageType = 'image/' + fileExtension.substring(1);
        res.statusCode = 200; 
        res.setHeader('Content-Type', imageType);
        res.end(imageFileContents);
        } catch(e) {
            res.statusCode = 404
            res.end()
            return
        }
    } else if (req.url.match(/^\/items\/new/)) {
        const formFilePath = './views/add-item.html';
        const formFileContents = await readFile(formFilePath);
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'text/html');
        res.end(formFileContents);
    } else {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'text/plain');
        res.end('I have items');
    }
}); 

server.listen(port, hostname, () => {
    console.log('Server is running'); 
})