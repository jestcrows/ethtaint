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
    const priv = {}
    privs.set(this, priv)
    priv.number = number
  }
}

// Expose
module.exports = Block
