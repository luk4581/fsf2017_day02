//Load express and path
var express = require("express");
var path = require("path");
var filesys = require("fs");

//create instance of express and path

var expressapp = express();
/*
if (myport){
    if (parseInt(myport) != NaN){
        myport = parseInt(myport);
        console.log("Using given port %d", myport);
    }
    else {myport = 3000;
    console.log("Argument is %s, using default port %d", parseInt(process.argv[2]), myport);
    }
}
else{
    myport = 3000;
    console.log("Using default port %d", myport);
}
expressapp.set("port", myport);*/

//lists down the content of the directory and make it into array
var imageSrc = filesys.readdirSync('./images/');

console.log('<img src="/images/%s" alt="">', imageSrc[parseInt(Math.random() * imageSrc.length)]);

expressapp.use(express.static(__dirname + "/public"));
expressapp.use(express.static(path.join(__dirname, "/images")));
expressapp.use("/images", function(req,resp){
    resp.type("image/jpg")
    resp.sendfile(__dirname + "/images/" + imageSrc[parseInt(Math.random() * imageSrc.length)]);
})

console.log("Env Type: %s", typeof(parseInt(process.env.APP_PORT)))

console.log("Available Port %d", parseInt(process.argv[2])||process.env.APP_PORT|| 3000)
expressapp.set("port", parseInt(process.argv[2])||process.env.APP_PORT|| 3000)

expressapp.listen(expressapp.get("port"), function(){
    console.info("Listening to port: %d", expressapp.get("port"))
})


for (var i = 0; i<process.argv.length; i++){
    console.log("Argv index %d: %s", i, process.argv[i]);
}