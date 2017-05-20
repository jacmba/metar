'use strict';

let Express = require('express');
let app = Express();
let port = process.env.METAR_PORT || 3000;

app.listen(port, () => {
  console.log(`Metar API listening on por ${port}`);
});