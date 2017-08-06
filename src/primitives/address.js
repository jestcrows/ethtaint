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
    priv.taints = null
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
  get taints () {
    const priv = privs.get(this)
    const taints = priv.taints
    if (taints === null) {
      return new Set()
    } else {
      return new Set(taints)
    }
  }

  /**
   * Has any taint.
   * @type {boolean}
   */
  get tainted () {
    const priv = privs.get(this)
    const taints = priv.taints
    if (taints === null) {
      return false
    } else {
      return (taints.size !== 0)
    }
  }

  /**
   * Add taint item.
   * @param {module:primitives/taint.Taint} taint
   *     Taint item.
   * @return {module:primitives/address.Address}
   *     This instance for chaining.
   */
  addTaint (taint) {
    // Validate arguments
    arg.Taint(taint)

    const priv = privs.get(this)
    if (priv.taints === null) {
      priv.taints = new Set()
    }
    const taints = priv.taints
    taints.add(taint)
    return this
  }

  /**
   * Check whether has taint item.
   * @param {module:primitives/taint.Taint} taint
   *     Taint item.
   * @return {boolean} Whether has taint item.
   */
  hasTaint (taint) {
    // Validate arguments
    arg.Taint(taint)

    const priv = privs.get(this)
    const taints = priv.taints
    if (taints === null) {
      return false
    } else {
      return taints.has(taint)
    }
  }
}

// Expose
module.exports = Address

// Circular imports
const arg = require('../util/arg')
