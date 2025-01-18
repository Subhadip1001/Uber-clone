const http = require('http');
const app = require('./app');
// const dotenv = require('dotenv');
// const cors = require('cors');


const server = http.createServer(app);
// dotenv.config();
const port = process.env.PORT || 4035;


server.listen(port, ()=>{
    console.log('Server is running at port ' + port);
})