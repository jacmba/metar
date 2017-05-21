'use strict';

const URL = 'https://www.aviationweather.gov/metar/data';
const DIR = `${__dirname}/../../cache`;
const TTL = 15 * 60 * 1000;

let Cache = require('../lib/cache');
let Web = require('../lib/web');
let Routes = require('./routes');
let Metar = require('./metar');

/**
 * @class Metar module
 */
class MetarIndex {
  //----------------------------------------------------------------------------
  /**
   * Create Metar module instance
   */
  constructor() {
    this._cache = new Cache(
      process.env.METAR_CACHEDIR || DIR,
      process.env.METAR_TTL || TTL
    );
    this._web = new Web(process.env.METAR_URL || URL);
    this._metar = new Metar(this._cache, this._web);
    this._routes = new Routes(this._metar);
  }

  //----------------------------------------------------------------------------
  /**
   * @returns {object} - Metar routes instance
   */
  getRoutes() {
    return this._routes;
  }
}

module.exports = MetarIndex;