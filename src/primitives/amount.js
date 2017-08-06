/**
 * @file Amount of ETH.
 * @package
 */

'use strict'

// Imports
const BigNumber = require('bignumber.js')

/**
 * Value class constructors.
 * @private
 */
const Value = {
  Wei: BigNumber.another({
    DECIMAL_PLACES: 0,
    ROUNDING_MODE: BigNumber.ROUND_HALF_UP
  })
}

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

  /**
   * Value in wei.
   * @type {BigNumber}
   */
  get wei () {
    const priv = privs.get(this)
    const value = priv.value
    const wei = new Value.Wei(value)
    return wei
  }
}

// Expose
module.exports = Amount

// Circular imports
const arg = require('../util/arg')
