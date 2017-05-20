'use strict';

let assert = require('assert');
let fs = require('fs');

const TESTDIR = __dirname + '/cacheTests';
const TEXT = `Now that there is the Tec-9, a crappy spray gun from South Miami.
This gun is advertised as the most popular gun in American crime.
Do you believe that shit? It actually says that in the little book that comes
with it: the most popular gun in American crime.
Like they're actually proud of that shit.`;
const NOW = new Date().getTime();

let Cache = require('../src/lib/cache');
let cache = new Cache(TESTDIR);

describe('Cache tests', () => {
  after(() => {
    if(fs.existsSync(TESTDIR)) {
      let files = fs.readdirSync(TESTDIR);
      files.forEach(file => {
        fs.unlinkSync(`${TESTDIR}/${file}`);
      });
      fs.rmdirSync(TESTDIR);
    }
  });

  //----------------------------------------------------------------------------
  it('Check cache dir exists', () => {
    assert(fs.existsSync(TESTDIR));
  });

  //----------------------------------------------------------------------------
  it('Save test info', (done) => {
    cache.save('test', TEXT)
    .then(() => {
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });

  //----------------------------------------------------------------------------
  it('Load test info', (done) => {
    cache.load('test')
    .then(data => {
      assert.strictEqual(data, TEXT);
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });
});