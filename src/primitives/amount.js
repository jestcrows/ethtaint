/**
 * @file Amount of ETH.
 * @package
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Amount of ETH.
 */
class Amount {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

// Expose
module.exports = Amount
