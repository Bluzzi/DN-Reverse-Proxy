import http from "node:http";
import httpProxy from "http-proxy";
import { log, generateErrorPage } from "./Utils.js";
import config from "../resources/config.json" assert { type: "json" };

// Create the proxy server (with ssl if it is enabled)) : 
const proxy = httpProxy.createProxyServer(
  config.ssl ? { ssl: config.ssl, secure: true } : {}
);

// Redirect requests :
const server = http.createServer(async (request, response) => {
  const host = request.headers.host;
  const redirectPort = config.redirections[host];
  
  if(redirectPort){
    proxy.web(request, response, { target: "https://127.0.0.1:" + redirectPort }, error => {
      if(error){
        log(`Error when redirecting to port ${redirectPort} for host "${host}"`);

        response.writeHead(404, { "Content-Type": "text/html" });
        response.write(generateErrorPage("No response from the site"));
        response.end();
      } else {
        log(`Redirecting to "${host}" effectued`);
      }
    });
  } else {
    log(`No redirection found for host "${host}"`);

    response.writeHead(404, { "Content-Type": "text/html" });
    response.write(generateErrorPage("Website not found"));
    response.end();
  }
});

// Listen at port 80 :
server.listen(config.port);
log(`Listening connections at port ${config.port}...`);