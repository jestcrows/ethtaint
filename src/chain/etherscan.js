/**
 * @file Chain agent interfacing with Etherscan.
 * @module chain/etherscan
 */

'use strict'

// Imports
const Client = require('../client/etherscan-throttled')

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Chain agent interfacing with Etherscan.
 * @static
 */
class ChainAgent {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
    priv.client = new Client()
  }
}

// Expose
module.exports = ChainAgent
