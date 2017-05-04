var http = require("http");
var fs = require("fs");

// Keširanje statičkih fajlova
var index = fs.readFileSync("index.html","utf8");
var appcss = fs.readFileSync("app.css","utf8");
var appjs = fs.readFileSync("app.js","utf8");
var ikona = fs.readFileSync("favicon.ico");

function prikaziPocetnuStranu(response){
  response.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile("index.html","utf8",function(error,data){
  		response.write(data);
      response.end();
  });
} 

function nemaStranice(response){
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Not Found</h1>");
  response.end();
}

function OdgovorNaZahtev(request,response){
  console.log(request.url)
  switch(request.url) {
    case "/": 
    case "/index.html": 
              prikaziPocetnuStranu(response);
              break;
    case "/app.css":
              response.writeHead(200, {"Content-Type": "text/css"});
              response.end(appcss);
              break;
    case "/favicon.ico":
              response.writeHead(200, {'Content-Type': 'image/gif' });
        			response.end(ikona, 'binary');
              break;
    case "/app.js":
						  response.writeHead(200, {"Content-Type": "text/plain"});
	            response.end(appjs);
	            break;
	  case "/moja-putanja":
	            var sadrzaj = ""
	            request.on('data', function (data) {
	              sadrzaj += data;
	            });
	            request.on('end', function () { 
	              response.end(sadrzaj)	
	            });	
	            break;
	  default: 
	            nemaStranice(response);
	            break;
	}
}

var server = http.createServer(OdgovorNaZahtev);
server.listen(8000);
console.log("Server ceka zahteve na portu 8000");
