/*
    Testing a timer microservice
    Created by Aashish Loknath Panigrahi (@asxyzp)
*/

const fs = require('fs');
const path = require('path');
const http = require('http');
const logger = require('./logger');
const { basename } = require('path');

const server = http.createServer((req,res)=>{
    
    //console.log(req.headers.cookie);

    //Emitting the event that a resource has been requested
    logger.emit('request',req.url);
    
    //Creating a filepath based on the request
    let filePath;
    if (req.url=='/'||req.url=='/index.html'){
        filePath = path.join(__dirname,'public','index.html');
    }
    else{
        filePath = path.join(__dirname,'public',req.url);
    }
    
    //Getting the extension name
    let extname = path.extname(filePath);

    //Setting the default content type
    let contentType = 'text/html';

    //Setting the content type using a switch
    switch(extname){
        case ".css":
            contentType = 'text/css';
            break;
        case ".js":
            contentType = 'text/javascript';
            break;
        case ".json":
            contentType = 'application/json';
            break;
        case ".png":
            contentType = 'image/png';
            break;
        case ".jpg":
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath,"utf8",(err,data)=>{
        if(err){
            //ERROR : The File was not found
            if(err.code='ENOENT'){
                //If the request URL contained setTimer
                //Then the server will send a response by setting a cookie
                //And storing the information sent in the database
                //Which will be received everytime the user requests the data
                if(req.url.indexOf('/setTimer')!=-1){
                    logger.emit('timerset',Date.now());
                }
                //Else an ENOENT error
                else{
                    logger.emit('enoent',path.basename(filePath));
                    fs.readFile(path.join(__dirname,'public','404.html'),"utf8",(err,data)=>{
                        if (err) throw err;
                        res.writeHead(404,{'Content-type':'text/html'});
                        res.end(data);
                    });
                }
            }
            //Else it's a server error
            else{
                logger.emit('serverr',err.code);
                throw err.code;
            }
        }
        //Else, everything is working fine & we can send the appropriate files
        else{
            fs.readFile(filePath,"utf8",(err,data)=>{
              res.writeHead(200,{'Content-type':contentType});
              res.write(data);
              res.end();  
            })
        }
    });
});

//Setting the port value
const port = process.env.PORT || 5000;

//Server listening at a given port
server.listen(port,(err)=>{
    if (err){
        logger.emit('serverFailed');
        throw err;
    }
    logger.emit('serverStarted');
    console.log(`SERVER STARTED AT ${port}`);
});