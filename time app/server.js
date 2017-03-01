const http = require("http"),
      url = require("url"),
      requestHandler = require("./requestHandler");

function start(route) {
	http.createServer((req, res) => {
    var urlObj = url.parse(req.url),
        pathname = urlObj.pathname;
    console.log("Pathname: " + pathname);
    switch (pathname) {
      case "/upload":
        requestHandler.upload(req, res);
        break;
      default:
        requestHandler.sendFile(pathname, req, res);
        break;
    }
  }).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
