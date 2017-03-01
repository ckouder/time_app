const fs = require("fs"),
      url = require("url"),
      path = require("path"),
      queryString = require("querystring"),
      mime = require("./common/mime").mime;

function sendFile(pathname, req, res) {
  var realPath = "assets" + ((pathname === "/")? "/index.html":pathname),
      type = path.extname(pathname).slice(1);

  fs.exists(realPath, (exist) => {
    if (!exist) {
      res.writeHead(404, "File not Found");
      res.end();
    } else {
      fs.readFile(realPath, (err, fd) => {
        if (err) {
          res.writeHead(500, "Server Error");
          res.write(err);
          res.end();
        } else {
          res.writeHead(200, {"Content-Type": mime[type]});
          res.write(fd, "binary");
          res.end();
        }
      });
    }
  });
}

exports.sendFile = sendFile;

function upload(req, res) {
  if (req.method === "POST") {
    var body = "";

    req.on("data", function (data) {
      body += data;

      if (body.length > 1e6) {
        req.connection.destory();
      }
    });

    req.on("end", () => {
      var url = "assets/data/example.json";
      console.log(body);
      fs.readFile(url, "utf8", (err, fd) => {
        if (err) {
          throw err;
        } else {
          var dataInto = JSON.parse(body),
              content = (fd === "")? []: JSON.parse(fd);
          console.log(fd);
          content.push(dataInto);
          content = JSON.stringify(content);
        }

        fs.writeFile(url, content, (err) => {
          if (err) {
            throw err;
          } else {
            res.writeHead(200);
            res.end();
          }
        });
      })
    });
  }
}

exports.upload = upload;
