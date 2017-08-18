"use strict";

let fs = require('fs');

/**
 * @class Cache storage
 */
class Cache {
  //----------------------------------------------------------------------------
  /**
   * @constructor Create cache instance
   * @param {string} base - Cache directory path
   * @param {number} ttl - Max live time in milliseconds
   */
  constructor(base, ttl) {
    if(!fs.existsSync(base)) {
      fs.mkdirSync(base);
    }

    this._baseDir = base;
    this._ttl = ttl || 30 * 60 * 1000;
  }

  //----------------------------------------------------------------------------
  /**
   * Store information in cache file
   * @param {string} file - File name without extension
   * @param {*} data - Information to be stored
   * @returns Promise
   */
  save(file, data) {
    return new Promise((resolve, reject) => {
      let cacheObj = {
        data: data,
        timestamp: new Date().getTime()
      };

      try {
        let filename = `${this._baseDir}/${file}.json`;
        fs.writeFile(filename, JSON.stringify(cacheObj, null, 2), err => {
          if(err) {
            return reject(err);
          }

          return resolve();
        });
      } catch(e) {
        return reject(e);
      }
    });
  }

  //----------------------------------------------------------------------------
  /**
   * Load information from cache file
   * @param {string} file - Cache file name without extension
   * @returns Promise
   */
  load(file) {
    return new Promise((resolve, reject) =>{
      let filename = `${this._baseDir}/${file}.json`;
      fs.readFile(filename, 'utf8', (err, data) => {
        if(err) {
          return reject(err);
        }

        let dataObj = JSON.parse(data);

        let age = new Date().getTime() - dataObj.timestamp;
        if(age > this._ttl) {
          fs.unlink(filename);
          return resolve(null);
        }

        return resolve(dataObj.data);
      });
    });
  }
}

module.exports = Cache;