'use strict';

let assert = require('assert');
let Web = require('../src/lib/web');

let web;

const URL = 'http://google.com';

describe('Web interface tests', () => {
  before(() => {
    web = new Web(URL);
  });

  //----------------------------------------------------------------------------
  it('Should have url "http://google.com"', () => {
    assert.strictEqual(web._url, URL);
  });

  //----------------------------------------------------------------------------
  it('Should receive an html body', (done) => {
    web.getData()
    .then(data => {
      assert(data.includes('<html'));
      assert(data.includes('</html'));
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });
});