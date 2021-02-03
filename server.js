const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static(path.join(__dirname, './dist')));

app.listen(PORT,'0.0.0.0', function() {
  console.log('Webserver is listening on port %d!',PORT);
});
