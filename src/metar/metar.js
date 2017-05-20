'use strict';

const PATTERN =
  /<!-- Data starts here -->\n(.*)<br.*\n<!-- Data ends here -->/mi;

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

  //----------------------------------------------------------------------------
  /**
   * Request a metar and return from cache or web
   * @param {string} icao  - Station 4-letter ICAO code
   * @returns Promise
   */
  getMetar(icao) {
    return new Promise((resolve, reject) => {
      let code = icao.toUpperCase();
      let self = this;
      
      // Download from web
      function download() {
        let qs = {
          ids: code
        };
        return self._web.getData(qs);
      }

      // Attempt load from cache
      this._cache.load(code)
      .then(result => {
        if(!result) {
          throw null;
        }

        return resolve(result);
      })
      .catch(() => {
        // Get from web when cache fails
        download()
        .then(result => {
          if(!PATTERN.test(result)) {
            let err = new Error('Invalid html pattern');
            return reject(new Error(err));
          }
          let info = PATTERN.exec(result)[1];
          self._cache.save(code, info);
          return resolve(info);
        })
        .catch(err => {
          return reject(err);
        });
      });
    });
  }
}

module.exports = Metar;