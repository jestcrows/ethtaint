/**
 * @file Etherscan API client.
 * @module client/etherscan
 */

'use strict'

// Imports
const config = require('config')

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Etherscan API client.
 * @static
 */
class Client {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
    priv.apiKey = config.get('Etherscan.apiKey')
  }
}

// Expose
module.exports = Client
