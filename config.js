var _ = require('lodash')
var dotenv = require('dotenv')

// load dotenv config vars if available
dotenv.load()

var config = {
  SONARR_API_URL: 'http://localhost:8989',
  SONARR_API_KEY: '866b8e70ca2c4a46b8cc7051d9e78c47'
}

// this basically loads w/e is in the environment variables
// and puts into an object with the above object as its defaults
config = _.defaults(process.env, config)

module.exports = config
