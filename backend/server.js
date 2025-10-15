const http = require('http');
// Make sure you are importing the app from the correct file path
const app = require('./app'); 

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});