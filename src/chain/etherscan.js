/**
 * @file Chain agent interfacing with Etherscan.
 * @module chain/etherscan
 */

'use strict'

// Imports
const BigNumber = require('bignumber.js')
const Client = require('../client/etherscan-throttled')
const Block = require('../primitives/block')
const Address = require('../primitives/address')
const Amount = require('../primitives/amount')
const Transaction = require('../primitives/transaction')

// Resources
var undef

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Map a client transaction to an ethtaint transaction.
 * @private
 * @param {module:client/etherscan~transaction} clientTx
 *     Client transaction.
   * @param {Object} cache - Set of caches.
   * @param {module:cache/cache.Cache} cache.block
   *     Block cache. Indexed by block number.
   * @param {module:cache/cache.Cache} cache.address
   *     Address cache. Indexed by address hex.
   * @param {module:cache/cache.Cache} cache.tx
   *     Transaction cache. Indexed by transaction hash.
 * @return {module:primitives/transaction.Transaction}
 *     Equivalent ethtaint transaction.
 */
async function mapTransaction (clientTx, cache) {
  // Map block
  const blockNumberString = clientTx.blockNumber
  const blockNumber = parseInt(blockNumberString, 10)
  let block = await cache.block.get(blockNumber)
  if (block === undef) {
    block = new Block(blockNumber)
    await cache.block.set(blockNumber, block)
  }

  // Map source address
  const fromHex = clientTx.from.toLowerCase()
  let from = await cache.address.get(fromHex)
  if (from === undef) {
    from = new Address(fromHex)
    await cache.address.set(fromHex, from)
  }

  // Map target address
  const toHex = clientTx.to.toLowerCase()
  let to
  if (toHex === '') {
    to = null
  } else {
    to = await cache.address.get(toHex)
    if (to === undef) {
      to = new Address(toHex)
      await cache.address.set(toHex, to)
    }
  }

  // Map transaction
  const hash = clientTx.hash.toLowerCase()
  let tx = await cache.tx.get(hash)
  if (tx === undef) {
    // Construct amount
    const valueString = clientTx.value
    const value = new BigNumber(valueString)
    const amount = new Amount(value)

    // Construct transaction
    tx = new Transaction(
      block,
      hash,
      from,
      to,
      amount
    )

    // Cache transaction
    await cache.tx.set(hash, tx)
  }

  // Return transaction
  return tx
}

/**
 * Chain agent interfacing with Etherscan.
 * @static
 */
class ChainAgent {
  /**
   * @param {Object} cache - Set of caches.
   * @param {module:cache/cache.Cache} cache.block
   *     Block cache. Indexed by block number.
   * @param {module:cache/cache.Cache} cache.address
   *     Address cache. Indexed by address hex.
   * @param {module:cache/cache.Cache} cache.tx
   *     Transaction cache. Indexed by transaction hash.
   */
  constructor (cache) {
    const priv = {}
    privs.set(this, priv)
    priv.cache = cache
    priv.client = new Client()
  }

  /**
   * Get list of account transactions.
   * @see {@link module:client/etherscan.Client#listAccountTransactions}
   * @return {module:primitives/transaction.Transaction[]}
   *     List of account transactions.
   */
  async listAccountTransactions () {
    // Private members
    const priv = privs.get(this)

    // Get raw transactions
    const rawTxs = await priv.client
      .listAccountTransactions(...arguments)

    // Map to Transaction objects
    const txs = []
    const cache = priv.cache
    for (var i = 0; i < rawTxs.length; i++) {
      var rawTx = rawTxs[i]
      var tx = await mapTransaction(rawTx, cache)
      txs.push(tx)
    }

    // Return result
    return txs
  }
}

// Expose
module.exports = ChainAgent
