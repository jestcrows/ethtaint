/**
 * @file Chain agent interfacing with Etherscan.
 * @module chain/etherscan
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
 * Chain agent interfacing with Etherscan.
 */
class ChainAgent {
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
module.exports = ChainAgent
