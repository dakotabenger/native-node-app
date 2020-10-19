const http = require('http');
const hostname = '127.0.0.1'; 
const port = 8081;  
const { readFile } = require('fs').promises;

const server = http.createServer(async (req, res) => {
    if (req.url.match(/^images/)) {
        const imageFilePath = './assets' + req.url;
        const imageFileContents = await readFile(imageFilePath);
    }
    
    
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/plain');
    res.end('I have items');
}); 

server.listen(port, hostname, () => {
    console.log('Server is running'); 
})