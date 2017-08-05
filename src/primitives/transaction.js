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
}

// Expose
module.exports = Transaction

// Circular imports
const arg = require('../util/arg')
