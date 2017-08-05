/**
 * @file A transaction.
 * @package
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * An Ethereum transaction.
 */
class Transaction {
  /**
   * @param block {Block} - Containing block.
   */
  constructor (block) {
    // Validate arguments
    arg.Block(block)

    const priv = {}
    privs.set(this, priv)
    priv.block = block
  }

  /**
   * Containing block.
   * @type {Block}
   */
  get block () {
    const priv = privs.get(this)
    const block = priv.block
    return block
  }
}

// Expose
module.exports = Transaction

// Circular imports
const arg = require('../util/arg')
