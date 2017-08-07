/**
 * @file Etherscan API client.
 * @module client/etherscan
 */

'use strict'

// Imports
const { URL } = require('url')
const config = require('config')
const requestGlobal = require('request-promise-native')

// Configure request
const request = requestGlobal.defaults({
  headers: {
    'User-Agent': 'ethtaint'
  }
})

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

  /**
   * Get list of account transactions.
   * @param {string} address - Account address.
   * @return {object[]} List of account transactions.
   */
  async listAccountTransactions (address) {
    // Construct request address
    const requestUrl = new URL(url.account.listTransactions)
    requestUrl.searchParams.set('address', address)
    const requestAddress = requestUrl.toString()

    // Acquire RPC response
    const rpcResponseJson = await request.get(requestAddress)
    const rpcResponse = JSON.parse(rpcResponseJson)

    // Extract result
    const result = rpcResponse.result

    // Return result
    return result
  }
}

// Expose
module.exports = Client
