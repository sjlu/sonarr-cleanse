var Promise = require('bluebird')
var sonarr = require('./lib/sonarr')
var moment = require('moment')
var _ = require('lodash')

var today = moment()

Promise
  .resolve()
  .then(function () {
    return sonarr.getDownloadedEpisodes()
  })
  .map(function (e) {
    var airDate = moment(e.airDate)
    var downloadDate = moment(e.addedDate)

    if (airDate.isBefore(moment(today).subtract(1, 'month'))) {
      if (downloadDate.isBefore(moment(today).subtract(1, 'week'))) {
        return e
      }
    }
  })
  .then(function (deleteEpisodes) {
    return _.filter(deleteEpisodes)
  })
  .map(function (e) {
    return sonarr.removeEpisode(e.episodeFileId)
  })
