import { getFile } from "./engine/cache-engine";
import { getStats } from "./engine/stats-engine";
import { Stats } from "./types/stats.type";

var express = require('express');
var app = express();

app.get('/image/:id', function(req, res) {
  var size: string = req.query.size;
  var imageName: string = req.params.id;

  console.log(JSON.stringify(req.query), JSON.stringify(req.params));

  getFile(imageName, size, function(image) {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(image);
  });
});

app.get('/status', function(req, res) {
  const stats: Stats = getStats();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body>');
  res.write('<h3>Service is running.</h3>');
  res.write('<div>Started at: ' + stats.started + '</div>');
  res.write('<div>Cache hits: ' + stats.cacheHits + '</div>');
  res.write('<div>Cache misses: ' + stats.cacheMisses + '</div>');
  res.write('<div>File missing: ' + stats.fileMisses + '</div>');
  res.end('</body></html>');
});

app.get('/', function(req, res) {
  res.redirect('/status');
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Backend app listening at http://%s:%s', host, port);
});
