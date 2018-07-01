import { getFile } from "./engine/cache-engine";
import { getStats } from "./engine/stats-engine";
import { Stats } from "./types/stats.type";

export function sum(a: number, b: number): number {
  return a + b;
}

var express = require('express');
var app = express();
var fs = require('fs');

app.get('/image/:id', function(req, res) {
  var size: string = req.query.size;
  var imageName: string = req.params.id;

  console.log(JSON.stringify(req.query), JSON.stringify(req.params));

  getFile(imageName, size, function(image) {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(image);
  });
});

app.get('/image-html/:id', function(req, res) {
  res.setHeader('content-type', 'image/jpeg');
  var size: string = req.query.size;
  var imageName: string = req.params.id;

  console.log(JSON.stringify(req.query), JSON.stringify(req.params));

  getFile(imageName, size, function(image) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><img src="data:image/jpeg;base64,');
    res.write(Buffer.from(image).toString('base64'));
    res.end('"/></body></html>');
  });
});


app.get('/status', function(req, res) {
  const stats: Stats = getStats();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body>');
  res.write('<div>Service is running.</div>');
  res.write('<div>Cache hits:' + stats.cacheHits + '</div>');
  res.write('<div>Cache misses:' + stats.cacheMisses + '</div>');
  res.write('<div>File missing:' + stats.fileMisses + '</div>');
  res.end('"</body></html>');
});

app.get('/', function(req, res) {
  res.redirect('/status');
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
