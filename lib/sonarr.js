var config = require('../config')
var Promise = require('bluebird')
var request = require('request')
var _ = require('lodash')

request = Promise.promisify(request)

var doRequest = function (method, uri, params) {
  var r = {
    method: method,
    url: config.SONARR_API_URL + '/api' + uri,
    headers: {
      'X-Api-Key': config.SONARR_API_KEY
    },
    json: true
  }

  if (r.method === 'GET') {
    r.qs = params
  } else {
    r.body = params
  }

  return request(r)
    .then(function (response) {
      return response.body
    })
}

module.exports.getDownloadedEpisodes = function () {
  return Promise
    .bind({})
    .then(function () {
      return doRequest('GET', '/series')
    })
    .then(function (series) {
      this.series = _.keyBy(series, 'id')
      return series
    })
    .map(function (series) {
      return doRequest('GET', '/episode', { seriesId: series.id })
    })
    .then(function (episodes) {
      return _.chain(episodes)
        .flatten()
        .filter(function (e) {
          return e.episodeFileId > 0
        })
        .values()
    })
    .map(function (episode) {
      return {
        seriesId: episode.seriesId,
        seriesTitle: this.series[episode.seriesId].title,
        seasonNumber: episode.seasonNumber,
        episodeNumber: episode.episodeNumber,
        episodeTitle: episode.title,
        episodeFileId: episode.episodeFileId,
        filePath: episode.episodeFile.path,
        airDate: episode.airDateUtc,
        addedDate: episode.episodeFile.dateAdded
      }
    })
}

module.exports.removeEpisode = function (fileId) {
  return doRequest('DELETE', '/episodefile/' + fileId)
}
