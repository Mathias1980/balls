'use strict';

// Express
const express = require('express');
const expressServer = express();
expressServer.use(express.static('public', {
  extensions: ['html']
}));


const init = ()=> {
  expressServer.listen(8080, err => console.log(err || 'Läuft ...'));
}

init();