/**
 * @file General key value object cache.
 * @module cache/cache
 */

'use strict'

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * General key value object cache.
 * @static
 */
class Cache {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
    priv.map = new Map()
  }
}

// Expose
module.exports = Cache
