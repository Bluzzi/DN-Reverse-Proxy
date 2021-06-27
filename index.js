// Packages :
const http = require("http");
const httpProxy = require("http-proxy");
const config = require("./config.json");

// Create proxy server : 
const proxy = httpProxy.createProxyServer({});

// Redirect requests :
let server = http.createServer(function(request, response) {
    let records = config.records;
    let host = request.headers.host;
    let redirect = records[host];
    
    if(redirect){
        if(config.https){
            proxy.web(request, response, {
                target: "https://127.0.0.1:" + redirect,
                secure: true,
                ssl: config.ssl
            }, error => {
                if(error){
                    console.log("[INFO] Error when redirecting to port " + redirect + " for host " + host + " !");
                    response.end("No records found.");
                } else {
                    console.log("[INFO] Redirecting to " + host + " effectued.");
                }
            });
        } else {
            proxy.web(request, response, { target: "http://127.0.0.1:" + redirect }, error => {
                if(error){
                    console.log("[INFO] Error when redirecting to port " + redirect + " for host " + host + " !");
                    response.end("No records found.");
                } else {
                    console.log("[INFO] Redirecting to " + host + " effectued.");
                }
            });
        }
    } else {
        console.log("[INFO] No redirection found for request " + host + " !");
        response.end("No records found.");
    }
});

// Listen at port 80 :
server.listen(config.port);
console.log("[INFO] Listen connections...");