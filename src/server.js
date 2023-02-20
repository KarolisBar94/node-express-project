const express = require('express');

const server = express();
server.use(express.static('public'));


server.listen(5008, () => {
    console.log('server is running on: http://localhost:5008')
})