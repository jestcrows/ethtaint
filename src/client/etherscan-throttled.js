/**
 * @file Throttled interface to Etherscan API client.
 * @module client/etherscan-throttled
 */

'use strict'

// Imports
const RawClient = require('./etherscan')

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Throttled interface to Etherscan API client.
 * @static
 */
class Client {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
    priv.rawClient = new RawClient()
  }
}

// Expose
module.exports = Client
