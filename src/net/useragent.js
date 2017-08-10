/**
 * @file The ethtaint user agent string.
 * @module net/useragent
 */

'use strict'

// Imports
const version = require('project-version')

/**
 * Web address of project repository.
 * @private
 */
const repositoryAddress =
  'https://github.com/jestcrows/ethtaint'

/**
 * The ethtaint user agent string.
 * @static
 */
let userAgent = 'ethtaint'

// Add version
if (version) {
  userAgent += '/' + version
}

// Add repository address
userAgent += ' (+' + repositoryAddress + ')'

// Expose
module.exports = userAgent
