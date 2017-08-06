/**
 * @file A block. Contains transactions.
 * @package
 */

'use strict'

/** Private members store. */
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
    priv.transactions = null
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

  /**
   * Contained taint-propagating transactions.
   * @type {Set<Transaction>}
   */
  get transactions () {
    const priv = privs.get(this)
    const transactions = priv.transactions
    if (transactions === null) {
      return new Set()
    } else {
      return new Set(transactions)
    }
  }

  /**
   * Contained taint-propagating transactions.
   * @type {Set<Transaction>}
   */
  get txs () {
    return this.transactions
  }
}

// Expose
module.exports = Block

// Circular imports
const arg = require('../util/arg')
