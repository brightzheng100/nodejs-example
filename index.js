const express = require('express')
const app = express()

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js App\n')
})

app.get('/ping', (req, res) => {
    res.send('Pong!\n')
})

app.get('/random', (req, res) => {
    let num = Math.floor(Math.random() * 9999);
    res.send(num + '\n');
})

app.listen(port, () => {
    console.log(`Server serving on port: ${port}`)
})