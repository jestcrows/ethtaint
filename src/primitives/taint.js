/**
 * @file Taint item.
 * @package
 */

'use strict'

// Imports
const Address = require('./address')

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * A taint item.
 */
class Taint {
  /**
   * @param {Address} source - Source of taint.
   */
  constructor (source) {
    // Validate arguments
    if (!(source instanceof Address)) {
      throw new Error('Argument source must be an Address')
    }

    const priv = {}
    privs.set(this, priv)
    priv.source = source
  }
}

// Expose
module.exports = Taint