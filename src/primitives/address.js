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
  }
}

// Expose
module.exports = Address
