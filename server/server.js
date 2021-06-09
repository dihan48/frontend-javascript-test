const http = require("http");
const url = require("url");
const fs = require("fs");
  
http.createServer(function(request, response){
    let filePath = url.parse(request.url).pathname.substr(1);
    if(filePath === ''){
        filePath = 'index.html'
    }
    filePath = '../build/'+filePath
    fs.readFile(filePath, function(error, data){
        if(error){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            response.end(data);
        }
    });
}).listen(3000, function(){
    console.log("Server started at 3000");
});