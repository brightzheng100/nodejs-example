const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    let i = Math.floor(Math.random() * 9999);
    res.end('Hello Node.js World ' + i + '\n');
});

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});