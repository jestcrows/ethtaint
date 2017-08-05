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
      return taint.slice()
    }
  }
}

// Expose
module.exports = Address
