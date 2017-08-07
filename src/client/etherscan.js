/**
 * @file Etherscan API client.
 * @module client/etherscan
 */

'use strict'

// Imports
const version = require('project-version')
const { URL } = require('url')
const config = require('config')
const requestGlobal = require('request-promise-native')

// Construct user agent string
let userAgent = 'ethtaint'
if (version) {
  userAgent += ' ' + version.toString()
}

// Configure request
const request = requestGlobal.defaults({
  headers: {
    'User-Agent': userAgent
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
   * An Ethereum transaction.
   * @todo Determine timeStamp meaning.
   * @todo Determine timeStamp encoding.
   * @todo Can only contract transactions fail with an error?
   * @todo Determine cumulativeGasUsed meaning.
   * @typedef {Object} transaction
   * @prop {string} blockNumber
   *     Containing block number. Integer string.
   * @prop {string} timeStamp
   *     Integer string.
   * @prop {string} hash
   *     Transaction hash.
   * @prop {string} nonce
   *     Transaction nonce. Integer string.
   * @prop {string} blockHash
   *     Containing block hash.
   * @prop {string} transactionIndex
   *     Index of transaction in containing block. Integer string.
   * @prop {string} from
   *     Hex representation of source address.
   * @prop {string} to
   *     Hex representation of target address.
   *     Empty string for contract creation transactions.
   * @prop {string} value
   *     Amount transferred in wei. Integer string.
   * @prop {string} gas
   *     Gas limit in gas. Integer string.
   * @prop {string} gasPrice
   *     Gas price in wei. Integer string.
   * @prop {string} isError
   *     Whether transaction failed with an error.
   *     Integer string "1" for error.
   *     Integer string "0" for no error.
   * @prop {string} input
   *     Transaction data.
   *     Hexadecimal string prepended with "0x".
   *     For empty data value is "0x".
   * @prop {string} contractAddress
   *     Hex representation of created contract address.
   *     Empty string for no contract created.
   * @prop {string} cumulativeGasUsed
   *     Integer string.
   * @prop {string} gasUsed
   *     Gas used by transaction in gas. Integer string.
   * @prop {string} confirmations
   *     Current number of containing block confirmations.
   *     Integer string.
   */

  /**
   * Get list of account transactions.
   * @param {string} address - Account address.
   * @param {object} options - Request options.
   * @param {number} [options.startBlock=null]
   *     Block number of query range low end inclusive.
   * @param {number} [options.endBlock=null]
   *     Block number of query range high end inclusive.
   * @return {module:client/etherscan~transaction[]}
   *     List of account transactions.
   */
  async listAccountTransactions (
    address, {
      startBlock = null,
      endBlock = null
    } = {}
  ) {
    // Validate arguments
    arg.addressHex(address)
    if (startBlock !== null) {
      arg.integer(startBlock)
    }
    if (endBlock !== null) {
      arg.integer(endBlock)
    }

    // Construct request address
    const requestUrl = new URL(url.account.listTransactions)
    requestUrl.searchParams.set('address', address)
    if (startBlock !== null) {
      requestUrl.searchParams.set('startBlock', startBlock)
    }
    if (endBlock !== null) {
      requestUrl.searchParams.set('endBlock', endBlock)
    }
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

// Circular imports
const arg = require('../util/arg')
