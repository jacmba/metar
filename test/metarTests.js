'use strict';

const URL = 'https://www.aviationweather.gov/metar/data';
const TESTDIR = __dirname + '/cacheTests';

const PATTERN = /^\w{4}\s.+\d{2}\/\d{2}\sq\d{3,4}.*$/i;

let Cache = require('../src/lib/cache');
let Web = require('../src/lib/web');
let Metar = require('../src/metar/metar');

let assert = require('assert');

let cache, web, metar;

describe('Metar model tests', () => {
  before(() => {
    cache = new Cache(TESTDIR);
    web = new Web(URL);
    metar = new Metar(cache, web);
  });

  //----------------------------------------------------------------------------
  it('Load sample metar', (done) => {
    metar.getMetar('gclp')
    .then(result => {
      console.log(`Metar: ${result}`);
      assert(PATTERN.test(result));
      done();
    })
    .catch(err => {
      throw err;
    });
  });
});