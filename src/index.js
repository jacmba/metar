'use strict';

let Express = require('express');
let Metar = require('./metar');

let app = Express();
let metar = new Metar();
let port = process.env.PORT || 3000;

let ctrl = metar.getRoutes();

app.get('/metar/:icao', (req, res) => {
  ctrl.getMetar(req, res);
});

app.listen(port, () => {
  console.log(`Metar API listening on por ${port}`);
});