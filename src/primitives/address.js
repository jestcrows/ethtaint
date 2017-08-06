/**
 * @file An Ethereum address.
 * @module primitives/address
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * An Ethereum address.
 * @static
 */
class Address {
  /**
   * @param {string} hex - Hexadecimal representation of address.
   */
  constructor (hex) {
    // Validate arguments
    arg.addressHex(hex)

    const priv = {}
    privs.set(this, priv)
    priv.hex = hex
    priv.taint = null
  }

  /**
   * Hexadecimal representation.
   * @type {string}
   */
  get hex () {
    const priv = privs.get(this)
    const hex = priv.hex
    return hex
  }

  /**
   * All collected taint.
   * @type {Set<module:primitives/taint.Taint>}
   */
  get taint () {
    const priv = privs.get(this)
    const taint = priv.taint
    if (taint === null) {
      return new Set()
    } else {
      return new Set(taint)
    }
  }

  /**
   * Add taint item.
   * @param {module:primitives/taint.Taint} taintItem
   *     Taint item.
   * @return {module:primitives/address.Address}
   *     This instance for chaining.
   */
  addTaint (taintItem) {
    // Validate arguments
    arg.Taint(taintItem)

    const priv = privs.get(this)
    if (priv.taint === null) {
      priv.taint = new Set()
    }
    const taint = priv.taint
    taint.add(taintItem)
    return this
  }

  /**
   * Check whether has taint item.
   * @param {module:primitives/taint.Taint} taintItem
   *     Taint item.
   * @return {boolean} Whether has taint item.
   */
  hasTaint (taintItem) {
    // Validate arguments
    arg.Taint(taintItem)

    const priv = privs.get(this)
    const taint = priv.taint
    if (taint === null) {
      return false
    } else {
      return taint.has(taintItem)
    }
  }
}

// Expose
module.exports = Address

// Circular imports
const arg = require('../util/arg')
