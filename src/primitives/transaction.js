/**
 * @file An Ethereum transaction.
 * @module primitives/transaction
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * An Ethereum transaction.
 * @static
 */
class Transaction {
  /**
   * @param {module:primitives/block.Block} block
   *     Containing block.
   * @param {string} hash - Transaction hash.
   * @param {module:primitives/address.Address} from
   *     Source address.
   * @param {module:primitives/address.Address} to
   *     Target address.
   * @param {module:primitives/amount.Amount} amount
   *     Amount transferred.
   */
  constructor (
    block,
    hash,
    from,
    to,
    amount
  ) {
    // Validate arguments
    arg.Block(block)
    arg.transactionHash(hash)
    arg.Address(from)
    arg.Address(to)
    arg.Amount(amount)

    const priv = {}
    privs.set(this, priv)
    priv.block = block
    priv.hash = hash
    priv.from = from
    priv.to = to
    priv.amount = amount
  }

  /**
   * Containing block.
   * @type {module:primitives/block.Block}
   */
  get block () {
    const priv = privs.get(this)
    const block = priv.block
    return block
  }

  /**
   * Transaction hash.
   * @type {string}
   */
  get hash () {
    const priv = privs.get(this)
    const hash = priv.hash
    return hash
  }

  /**
   * Source address.
   * @type {module:primitives/address.Address}
   */
  get from () {
    const priv = privs.get(this)
    const from = priv.from
    return from
  }

  /**
   * Target address.
   * @type {module:primitives/address.Address}
   */
  get to () {
    const priv = privs.get(this)
    const to = priv.to
    return to
  }

  /**
   * Amount transferred.
   * @type {module:primitives/amount.Amount}
   */
  get amount () {
    const priv = privs.get(this)
    const amount = priv.amount
    return amount
  }
}

// Expose
module.exports = Transaction

// Circular imports
const arg = require('../util/arg')
