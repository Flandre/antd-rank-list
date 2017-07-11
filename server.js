const express = require('express')
const app = new express();
const path = require('path')
const port = 3000;

const opn = require('opn')

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/test.html')
});

app.use(express.static(path.join(__dirname, 'dist')))

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    opn('http://localhost:' + port, {app: 'chrome'})
  }
});