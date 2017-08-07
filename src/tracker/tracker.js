/**
 * @file Ethereum taint tracker.
 * @module tracker/tracker
 */

'use strict'

// Imports
const EventEmitter = require('events')
const Cache = require('../cache/cache')
const ChainAgent = require('../chain/etherscan')
const Address = require('../primitives/address')
const Taint = require('../primitives/taint')

// Resources
var undef

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Get any tainted untraced address.
 * @private
 * @param {Set<Address>} tainted - Tainted addresses.
 * @param {Set<Address>} traced - Traced addresses.
 * @return {Address|null} A tainted untraced address.
 */
function getTaintedUntraced (tainted, traced) {
  var address
  for (address of tainted) {
    if (!traced.has(address)) {
      return address
    }
  }
  return null
}

/**
 * Process a transaction.
 */
function processTransaction (
  tracker,
  taint,
  source,
  tx,
  tainted
) {
  // No target
  if (tx.to === null) {
    return
  }

  // Input
  if (tx.to === source) {
    return
  }

  // No value
  if (tx.amount.wei.equals(0)) {
    return
  }

  // Already propagated
  if (tx.hasTaint(taint)) {
    return
  }

  // Record propagated
  tx.addTaint(taint)

  // Add to tainted list
  tainted.add(tx.to)

  // Already tainted
  if (tx.to.hasTaint(taint)) {
    return
  }

  // Record tainted
  tx.to.addTaint(taint)

  // Emit tainted
  tracker.emit('taint', tx.to, taint)
}

/**
 * New address tainted.
 * @event Tracker#taint
 * @type {Array}
 * @prop {module:primitives/address.Address} 0
 *     Tainted address.
 * @prop {module:primitives/taint.Taint} 1
 *     Propagated taint.
 */

/**
 * Acquiring page of transactions for tainted address.
 * @event Tracker#page
 * @type {Array}
 * @prop {module:primitives/address.Address} 0
 *     Tainted address.
 * @prop {number} 1
 *     Page number.
 */

/**
 * Processed transaction for tainted address.
 * @event Tracker#processedTransaction
 * @type {Array}
 * @prop {module:primitives/address.Address} 0
 *     Tainted address.
 * @prop {module:primitives/transaction.Transaction} 1
 *     Processed transaction.
 */

/**
 * Ethereum taint tracker.
 * @static
 * @emits Tracker#taint
 */
class Tracker extends EventEmitter {
  /**
   * No parameters.
   */
  constructor () {
    super()
    const priv = {}
    privs.set(this, priv)
    priv.cache = {
      block: new Cache(),
      address: new Cache(),
      tx: new Cache()
    }
    priv.chain = new ChainAgent(priv.cache)
    priv.pageSize = 50
  }

  /**
   * Trace addresses tainted by specified source.
   * Starts asynchronous acquisition of all descendant tainting.
   * Each newly tainted address fires {@link event:Tracker#taint}.
   * Runs until extant chain data is exhausted.
   * Returned promise resolves when finished.
   * @todo Detect and use extant taint with same source.
   * @param {string} sourceHex
   *     Source address of taint. As an address hex.
   * @return {undefined}
   */
  async traceAddresses (sourceHex) {
    // Validate arguments
    arg.addressHex(sourceHex)

    // Private members
    const priv = privs.get(this)
    const cache = priv.cache
    const chain = priv.chain
    const pageSize = priv.pageSize

    // Get address
    let source = await cache.address.get(sourceHex)
    if (source === undef) {
      source = new Address(sourceHex)
      await cache.address.set(sourceHex, source)
    }

    // Create taint
    const taint = new Taint(source)
    source.addTaint(taint)

    // Working data
    const tainted = new Set()
    tainted.add(source)
    const traced = new Set()

    // Trace
    for (
      let address = getTaintedUntraced(tainted, traced);
      address !== null;
      traced.add(address),
      address = getTaintedUntraced(tainted, traced)
    ) {
      // Get address transactions
      let txs, numTxs, tx
      let page = 1
      do {
        // Get next page of transactions
        this.emit(
          'page',
          address,
          page
        )
        txs = await chain
          .listAccountTransactions(address.hex, {
            page,
            pageSize
          })
        numTxs = txs.length

        // Process transactions
        for (var i = 0; i < numTxs; i++) {
          tx = txs[i]
          await processTransaction(
            this,
            taint,
            address,
            tx,
            tainted
          )
          this.emit(
            'processedTransaction',
            address,
            tx
          )
        }

        // Increment page number
        page++
      } while (numTxs === pageSize)
    }
  }
}

// Expose
module.exports = Tracker

// Circular imports
const arg = require('../util/arg')
