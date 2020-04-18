const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');//importing dishRouter.js node module
const hostname = 'localhost';
const port = 3000;

const app = express();/*we are saying that our application is going to use the express nodemodule
once we do that, then Express provides a bunch of methods that we can use to construct our web server. */

app.use(morgan('dev'));//using developer morgan
app.use(bodyParser.json());//allows us to parse the body of request message which is in json and added to the req as req.body

app.use('/dishes', dishRouter);//mounting the dishRouter with /dishes

//seting up server to use html files in public folder
app.use(express.static(__dirname+'/public'))//serve static file from directory name public in root folder
//setting up server 
app.use((req,res,next/*(next is optional)*/) => {

    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Express Server</h1></body></html>')
});//express user additional middleware so 'next' is is used when you need to invoke additional middleware to take care of work on your behalf. 

const server = http.createServer(app);
server.listen(port,hostname, () =>
{
    console.log(`Server running http://${hostname}:${port}`)
});