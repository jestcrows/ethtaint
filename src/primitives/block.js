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
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

// Expose
module.exports = Block
