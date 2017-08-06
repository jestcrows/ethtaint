/**
 * @file A taint item.
 * @module primitives/taint
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * A taint item.
 * @static
 */
class Taint {
  /**
   * @param {module:primitives/address.Address} source
   *     Source of taint.
   */
  constructor (source) {
    // Validate arguments
    arg.Address(source)

    const priv = {}
    privs.set(this, priv)
    priv.source = source
    priv.recipients = null
    priv.transactions = null
  }

  /**
   * Source of taint.
   * @type {module:primitives/address.Address}
   */
  get source () {
    const priv = privs.get(this)
    const source = priv.source
    return source
  }

  /**
   * Recipients of taint. Excludes source.
   * @type {Set<module:primitives/address.Address>}
   */
  get recipients () {
    const priv = privs.get(this)
    const recipients = priv.recipients
    if (recipients === null) {
      return new Set()
    } else {
      return new Set(recipients)
    }
  }

  /**
   * Tainted addresses. Includes source.
   * @type {Set<module:primitives/address.Address>}
   */
  get addresses () {
    const priv = privs.get(this)
    const source = priv.source
    const recipients = priv.recipients
    if (recipients === null) {
      return new Set([source])
    } else {
      return new Set([source, ...recipients])
    }
  }

  /**
   * Propagating transactions.
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
   * Add recipient.
   * @param {module:primitives/address.Address} recipient
   *     Recipient of taint.
   * @return {module:primitives/taint.Taint}
   *     This instance for chaining.
   */
  addRecipient (recipient) {
    // Validate arguments
    arg.Address(recipient)

    const priv = privs.get(this)
    if (priv.recipients === null) {
      priv.recipients = new Set()
    }
    const recipients = priv.recipients
    recipients.add(recipient)
    return this
  }

  /**
   * Check whether has recipient.
   * @param {module:primitives/address.Address} address
   *     Queried address.
   * @return {boolean} Whether has address as recipient.
   */
  hasRecipient (address) {
    // Validate arguments
    arg.Address(address)

    const priv = privs.get(this)
    const recipients = priv.recipients
    if (recipients === null) {
      return false
    } else {
      return recipients.has(address)
    }
  }

  /**
   * Check whether has address.
   * @param {module:primitives/address.Address} address
   *     Queried address.
   * @return {boolean} Whether has address.
   */
  hasAddress (address) {
    // Validate arguments
    arg.Address(address)

    const priv = privs.get(this)
    const source = priv.source
    if (source === address) {
      return true
    }
    const recipients = priv.recipients
    if (recipients === null) {
      return false
    } else {
      return recipients.has(address)
    }
  }
}

// Expose
module.exports = Taint

// Circular imports
const arg = require('../util/arg')
