/**
 * @file A block. Contains transactions.
 * @package
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * An Ethereum block.
 */
class Block {
  /**
   * @param {number} number - Block number.
   */
  constructor (number) {
    // Validate arguments
    arg.integer(number)

    const priv = {}
    privs.set(this, priv)
    priv.number = number
  }

  /**
   * Block number.
   * @type {number}
   */
  get number () {
    const priv = privs.get(this)
    const number = priv.number
    return number
  }
}

// Expose
module.exports = Block

// Circular imports
const arg = require('../util/arg')
