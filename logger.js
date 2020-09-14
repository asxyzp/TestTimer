/*
    Creating a basic logger
    Created by Aashish Loknath Panigrahi (@asxyzp)
*/
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
class Logger extends EventEmitter {}
const logger = new Logger();

//Creating a serverStarted listener 
logger.on('serverStarted',()=>{
    //If there's no directory called log
    if(!fs.existsSync(path.join(__dirname,'log'))){
        //Then a new directory called log will be created
        fs.mkdir(path.join(__dirname,'log'),(err)=>{
            if(err)
                throw err;
            //Then a new file will be created which will be appended with Success message for server being created
            fs.appendFile(path.join(__dirname,'log','log.txt'),`SUCCESS : SERVER CREATED AT ${Date.now()}\n`,(err)=>{
                if (err)
                    throw err;
                console.log(`SUCCESS : SERVER CREATED AT ${Date.now()}\n`);
            });
        });
    }
    //If there's already a directory called log
    else{
        //Then log will be appended in the file
        fs.appendFile(path.join(__dirname,'log','log.txt'),`SUCCESS : SERVER CREATED AT ${Date.now()}\n`,(err)=>{
            if (err)
                throw err;
            console.log(`SUCCESS : SERVER CREATED AT ${Date.now()}\n`);
        });
    }
});

//Creating a listener for serverFailed event
logger.on('serverFailed',()=>{
    
    //If there's no log directory
    if(!fs.existsSync(path.join(__dirname,'log'))){

        //Then log directory will be created
        fs.mkdir(path.join(__dirname,'log'),(err)=>{
            if(err)
                throw err;

            //And then a new file will be created w/ ERROR message
            fs.appendFile(path.join(__dirname,'log','log.txt'),`ERROR : SERVER FAILED TO BE CREATED AT ${Date.now()}\n`,(err)=>{
                if (err)
                    throw err;
                console.log(`ERROR : SERVER FAILED TO BE CREATED AT ${Date.now()}\n`);
            });
        });
    }

    //Else if there's already a directory
    else{

        //Then information will be appended to it
        fs.appendFile(path.join(__dirname,'log','log.txt'),`ERROR : SERVER FAILED TO BE CREATED AT ${Date.now()}\n`,(err)=>{
            if (err)
                throw err;
            console.log(`ERROR : SERVER FAILED TO BE CREATED AT ${Date.now()}\n`);
        });
    }
});

//When a user requests a resource then log the resource
logger.on('request',(url)=>{
    fs.appendFile(path.join(__dirname,'log','log.txt'),`RESOURCE REQUEST : ${url} AT ${Date.now()}\n`,(err)=>{
        if(err)
            throw err;
        console.log(`RESOURCE REQUEST : ${url} AT ${Date.now()}`);
    });
});

//When there's an ENOENT error
logger.on('enoent',(resource)=>{
    fs.appendFile(path.join(__dirname,'log','log.txt'),`ENOENT ERROR at ${Date.now()}\n`,(err)=>{
        if(err)
            throw err;
        console.log(`ENOENT ERROR FOR ${resource} at ${Date.now()}`);
    });
});

//When there's an ENOENT error
logger.on('serverr',(errcode)=>{
    fs.appendFile(path.join(__dirname,'log','log.txt'),`SERVER ERROR ${errcode} at ${Date.now()}\n`,(err)=>{
        if(err)
            throw err;
        console.log(`SERVER ERROR ${errcode} at ${Date.now()}`);
    });
});

module.exports = logger;