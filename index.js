const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();/*we are saying that our application is going to use the express nodemodule
once we do that, then Express provides a bunch of methods that we can use to construct our web server. */

app.use(morgan('dev'));//using developer morgan
app.use(bodyParser.json());//allows us to parse the body of request message which is in json and added to the req as req.body

app.all('/dishes',(req,res,next) => 
{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();//next looks for additional specification downbelow which matches the end point i.e 'dishes' and passes req and res as parameter to it.
});

app.get('/dishes',(req,res,next) =>
{
    res.end("Will send all dishes to you!")
})

app.post('/dishes',(req,res,next) => {
    res.end('Will add the dish :' + req.body.name+" with details :"+ req.body.description)
});

app.put('/dishes',(req,res,next) => {
    res.statusCode = 403;//operation not supported
    res.end('PUT operation not supported on /dishes')
});

app.delete('/dishes',(req,res,next) =>
{
    res.end("Deleating all dishes")
});

app.get('/dishes/:dishId',(req,res,next) =>
{
    res.end("Will send details of the dish :" + req.params.dishId + " to you!");
})

app.post('/dishes/:dishId',(req,res,next) => {
    res.statusCode = 403;//operation not supported
    res.end('POST operation not supported on /dishes/' + res.params.dishId)
});

app.put('/dishes/:dishId',(req,res,next) => {
    res.write('Updating dish :'+req.params.dishId + '\n')//use to add line to reply message
    res.end('Will Update the dish :'+req.body.name + 'with details :'+req.body.description)
});

app.delete('/dishes/:dishId',(req,res,next) =>
{
    res.end("Deleating dish :"+req.params.dishId)
});

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