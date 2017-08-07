/**
 * @file Ethereum taint tracker.
 * @module tracker/tracker
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Ethereum taint tracker.
 * @static
 */
class Tracker {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

// Expose
module.exports = Tracker
