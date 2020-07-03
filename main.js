const http = require('http');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
}

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/javascript" });
  const filePath = '.' + request.url;
  const extName = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extName];

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err == 'ENOENT') {
        response.writeHead(404, 'Sorry lad');
        response.end(content, 'utf-8');
      } else {
        console.log(err);
        response.writeHead(500, 'Sorry lad');
        response.end(content, 'utf-8');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');