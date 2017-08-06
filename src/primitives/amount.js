/**
 * @file An amount of ether.
 * @module primitives/amount
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
  }),
  Ether: BigNumber.another({
    DECIMAL_PLACES: 8,
    ROUNDING_MODE: BigNumber.ROUND_HALF_UP
  })
}

/**
 * Unit scaling factors.
 * @private
 */
const scalingFactor = {
  ether: '1000000000000000000'
}

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * An amount of ether.
 * @static
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

  /**
   * Value in ether.
   * @type {BigNumber}
   */
  get ether () {
    const priv = privs.get(this)
    const value = priv.value
    const ether = new Value.Ether(value)
      .dividedBy(scalingFactor.ether)
    return ether
  }

  /**
   * Value in ether.
   * @type {BigNumber}
   */
  get eth () {
    return this.ether
  }
}

// Expose
module.exports = Amount

// Circular imports
const arg = require('../util/arg')
