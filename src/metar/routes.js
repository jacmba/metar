'use strict';

/**
 * @Class Metar module controller
 */
class MetarRoutes {
  //----------------------------------------------------------------------------
  /**
   * Create metar routing instance
   * @param {object} model - Metar model instance
   */
  constructor(model) {
    this._model = model;
  }

  //----------------------------------------------------------------------------
  /**
   * Retrieve station metar
   * @param {object} req - Client request
   * @param {object} req.params - URL path variables
   * @param {string} req.params.icao - Station ICAO code
   * @param {object} res - Server response
   */
  getMetar(req, res) {
    this._model.getMetar(req.params.icao)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(404).send(err);
    });
  }
}

module.exports = MetarRoutes;