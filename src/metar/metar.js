'use strict';

class Metar {
  //----------------------------------------------------------------------------
  /**
   * @constructor Create metar model instance
   * @param {object} cache - Cache storage instance
   * @param {object} web  - HTTP request handler
   */
  constructor(cache, web) {
    this._cache = cache;
    this._web = web;
  }
}

module.exports = Metar;