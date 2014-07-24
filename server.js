var http = require("http");
var fs = require("fs");
var path = require("path");

function send404(response) {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404: not found");
    response.end();
}

http.createServer(function (request, response) {
    var filePath;
    if (request.url === "/") {
        filePath = "index.html";
    } else if (/[data|scripts|js|css]\/\S+\.[json|js|css|html]/.test(request.url)) {
        filePath = request.url;
    } else {
        send404
    }
    if (filePath) {
        fs.exists("./" + filePath, function (exists) {
            if (exists) {
                fs.readFile("./" + filePath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        var mime = path.extname(filePath);
                        switch (mime) {
                            case ".json":
                                mime = "application/json";
                                break;
                            case ".html":
                                mime = "text/html";
                                break;
                            case ".css":
                                mime = "text/css";
                                break;
                            case ".js":
                                mime = "application/javascript";
                                break;
                            default:
                                mime = "text/plain";
                        }
                        response.writeHead(200, {"content-type": mime});
                        response.end(data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}).listen(1337, "127.0.0.1");
console.log("Server running at http://127.0.0.1:1337/");