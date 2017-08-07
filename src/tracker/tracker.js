/**
 * @file Ethereum taint tracker.
 * @module tracker/tracker
 */

'use strict'

// Imports
const Cache = require('../cache/cache')
const ChainAgent = require('../chain/etherscan')

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Ethereum taint tracker.
 * @static
 */
class Tracker {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
    priv.cache = {
      block: new Cache(),
      address: new Cache(),
      tx: new Cache()
    }
    priv.chain = new ChainAgent(priv.cache)
  }
}

// Expose
module.exports = Tracker
