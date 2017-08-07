/**
 * @file Centrally configured web client.
 * @module net/request
 */

'use strict'

// Imports
const userAgent = require('./useragent')
const requestStandard = require('request-promise-native')

// Configure
const request = requestStandard.defaults({
  headers: {
    'User-Agent': userAgent
  }
})

// Expose
module.exports = request
