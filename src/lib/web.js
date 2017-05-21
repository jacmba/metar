'use strict';

let request = require('request');

/**
 * @class Web interface
 */
class Web {
  //----------------------------------------------------------------------------
  /**
   * @constructor Create instance of web interface
   * @param {string} url - Base requests address
   */
  constructor(url = null) {
    this._url = url;
  }

  //----------------------------------------------------------------------------
  /**
   * Get data from the www
   * @param {object} queryString - Set of query string values
   * @returns Promise
   */
  getData(queryString = {}) {
    return new Promise((resolve, reject) => {
      request.get(
        this._url,
        {
          qs: queryString
        },
        (err, resp) => {
        if(err) {
          return reject(err);
        }

        return resolve(resp.body);
      });
    });
  }
}

module.exports = Web;