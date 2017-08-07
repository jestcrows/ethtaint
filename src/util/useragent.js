/**
 * @file The ethtaint user agent string.
 * @module util/useragent
 */

'use strict'

// Imports
const version = require('project-version')

/**
 * The ethtaint user agent string.
 * @static
 */
let userAgent = 'ethtaint'

// Add version
if (version) {
  userAgent += '/' + version
}

// Expose
module.exports = userAgent
