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

  /**
   * Set key to value.
   * @param {*} key - Element key.
   * @param {*} value - Element value.
   * @return {module:cache/cache.Cache}
   *     This instance for chaining.
   */
  async set (key, value) {
    const priv = privs.get(this)
    const map = priv.map
    map.set(key, value)
  }
}

// Expose
module.exports = Cache
