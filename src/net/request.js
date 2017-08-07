/**
 * @file Centrally configured web client.
 * @module net/request
 */

'use strict'

// Imports
const requestStandard = require('request-promise-native')

// Configure
const request = requestStandard.defaults()

// Expose
module.exports = request
