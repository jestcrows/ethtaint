/**
 * @file An Ethereum block.
 * @module primitives/block
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * An Ethereum block.
 * @static
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
   * @type {Set<module:primitives/transaction.Transaction>}
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
   * @type {Set<module:primitives/transaction.Transaction>}
   */
  get txs () {
    return this.transactions
  }

  /**
   * Add transaction.
   * @param {module:primitives/transaction.Transaction} tx
   *     Transaction.
   * @return {module:primitives/block.Block}
   *     This instance for chaining.
   */
  addTransaction (tx) {
    // Validate arguments
    arg.Transaction(tx)

    const priv = privs.get(this)
    if (priv.transactions === null) {
      priv.transactions = new Set()
    }
    const transactions = priv.transactions
    transactions.add(tx)
    return this
  }

  /**
   * Check whether contains transaction.
   * @param {module:primitives/transaction.Transaction} tx
   *     Queried transaction.
   * @return {boolean} Whether contains transaction.
   */
  hasTransaction (tx) {
    // Validate arguments
    arg.Transaction(tx)

    const priv = privs.get(this)
    const transactions = priv.transactions
    if (transactions === null) {
      return false
    } else {
      return transactions.has(tx)
    }
  }
}

// Expose
module.exports = Block

// Circular imports
const arg = require('../util/arg')
