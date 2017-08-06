/**
 * @file Etherscan API client.
 * @module client/etherscan
 */

'use strict'

// Imports
const { URL } = require('url')
const config = require('config')

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Etherscan API URLs.
 * @private
 */
const url = {}

/** Base URL. */
url.base = new URL('https://api.etherscan.io/api')

/** Account module URLs. */
url.account = {}

/** Account base URL. */
url.account.base = new URL(url.base)
url.account.base
  .searchParams.set('module', 'account')

/** Account -> List Transactions URL. */
url.account.listTransactions = new URL(url.account.base)
url.account.listTransactions
  .searchParams.set('action', 'txlist')

/**
 * Etherscan API client.
 * @static
 */
class Client {
  /**
   * No parameters.
   */
  constructor () {
    const priv = {}
    privs.set(this, priv)
    priv.apiKey = config.get('Etherscan.apiKey')
  }
}

// Expose
module.exports = Client
