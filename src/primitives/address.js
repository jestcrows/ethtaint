/**
 * @file Address type.
 * @package
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * An Ethereum block chain address.
 */
class Address {
  /**
   * @param {string} hex - Hexadecimal representation of address.
   */
  constructor (hex) {
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
   * @type {Taint[]}
   */
  get taint () {
    const priv = privs.get(this)
    const taint = priv.taint
    if (taint === null) {
      return []
    } else {
      return [...taint]
    }
  }

  /**
   * Add taint item.
   * @param taintItem {Taint} - Taint item.
   * @return {Address} - This instance for chaining.
   */
  addTaint (taintItem) {
    // Validate arguments
    arg.Taint(taintItem)

    const priv = privs.get(this)
    if (priv.taint === null) {
      priv.taint = []
    }
    const taint = priv.taint
    taint.push(taintItem)
    return this
  }
}

// Expose
module.exports = Address

// Circular imports
const arg = require('../util/arg')
