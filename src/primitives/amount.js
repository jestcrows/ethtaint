/**
 * @file Amount of ETH.
 * @package
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Amount of ETH.
 */
class Amount {
  /**
   * @param {BigNumber} value - Value in wei.
   */
  constructor (value) {
    // Validate arguments
    arg.BigNumber(value)

    const priv = {}
    privs.set(this, priv)
    priv.value = value
  }
}

// Expose
module.exports = Amount

// Circular imports
const arg = require('../util/arg')
