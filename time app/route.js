// distinguish homepage and other files
// => load homepage directly
// => file extensions and
const path = require("path"),
      url = require("url"),
      fs = require("fs"),
      mime = require("./common/mime").mime;

function router(pathname, res, req) {
  //pathname: /data.js
  
}

exports.router = router;
