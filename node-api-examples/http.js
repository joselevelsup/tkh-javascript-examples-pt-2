const http = require("http");

const server = http
  .createServer((request, response) => {
    console.log(request.url);
    if (request.url === "/") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("<h1>Hello world</h1>");
      response.end();
    } else if (request.url === "/home") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("<h1>Hello Home</h1>");
      response.end();
    } else if (request.url === "/data") {
      response.writeHead(200, {"Content-Type": "application/json" })
      response.write(JSON.stringify({
        data: {
          name: "bebo"
        }
      }))
      response.end();
    } else {
      response.writeHead(404);
      response.end();
    }
  })

  module.exports = server;