const http = require('http');
const app = require('./app');
const { intializeSocket } = require('./socket');


const server = http.createServer(app);
const port = process.env.PORT || 4035;

intializeSocket(server);

server.listen(port, ()=>{
    console.log('Server is running at port ' + port);
})