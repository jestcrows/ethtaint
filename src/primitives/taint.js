/**
 * @file Taint item.
 * @package
 */

'use strict'

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
    arg.Address(source)

    const priv = {}
    privs.set(this, priv)
    priv.source = source
    priv.recipients = null
  }

  /**
   * Source of taint.
   * @type {Address}
   */
  get source () {
    const priv = privs.get(this)
    const source = priv.source
    return source
  }

  /**
   * Recipients of taint. Excludes source.
   * @type {Set<Address>}
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
}

// Expose
module.exports = Taint

// Circular imports
const arg = require('../util/arg')
