/**
 * @file Ethereum taint tracker.
 * @module tracker/tracker
 */

'use strict'

// Imports
const fs = require('fs')
const mkdirp = require('mkdirp')
const EventEmitter = require('events')
const Cache = require('../cache/cache')
const ChainAgent = require('../chain/etherscan')
const Address = require('../primitives/address')
const Taint = require('../primitives/taint')

// Resources
var undef

/**
 * Private members store.
 * @private
 */
const privs = new WeakMap()

/**
 * Get any tainted untraced address.
 * @private
 * @param {Set<Address>} tainted - Tainted addresses.
 * @param {Set<Address>} traced - Traced addresses.
 * @return {Address|null} A tainted untraced address.
 */
function getTaintedUntraced (tainted, traced) {
  var address
  for (address of tainted) {
    if (!traced.has(address)) {
      return address
    }
  }
  return null
}

/**
 * Check whether save exists.
 * @param {string} sourceHex - Hex representation of taint source address.
 * @param {number} startBlock - Start block of tainting.
 * @return {boolean} Whether save exists.
 */
async function saveExists (sourceHex, startBlock) {
  return new Promise((resolve, reject) => {
    const dirPath = 'trace/' + sourceHex + '-' + startBlock
    fs.access(dirPath, err => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * Create directory and all parent directories.
 * @param {string} dirPath - Path to directory.
 * @return {undefined}
 */
async function createDirectory (dirPath) {
  return new Promise((resolve, reject) => {
    mkdirp(dirPath, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Initialize file.
 * @param {string} filePath - Path to file.
 * @param {string} data - Initial data.
 * @return {undefined}
 */
async function initializeFile (filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Open file.
 * @param {string} filePath - Path to file.
 * @param {string} mode - File mode.
 * @return File descriptor.
 */
async function openFile (filePath, mode) {
  return new Promise((resolve, reject) => {
    fs.open(filePath, mode, (err, fd) => {
      if (err) {
        reject(err)
      } else {
        resolve(fd)
      }
    })
  })
}

/**
 * Close file.
 * @param fd - File descriptor.
 * @return {undefined}
 */
async function closeFile (fd) {
  return new Promise((resolve, reject) => {
    fs.close(fd, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Create empty file.
 * @param {string} filePath - Path to file.
 * @return {undefined}
 */
async function createEmptyFile (filePath) {
  const fd = await openFile(filePath, 'wx')
  await closeFile(fd)
}

/**
 * Read file.
 * @param {string} filePath - Path to file.
 * @return {string} File data.
 */
async function readFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Write file.
 * @param {string} filePath - Path to file.
 * @param {string} data - File data.
 * @return {undefined}
 */
async function writeFile (filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Initialize save.
 * @param {string} sourceHex - Hex representation of taint source address.
 * @param {number} startBlock - Start block of tainting.
 * @return {undefined}
 */
async function initializeSave (sourceHex, startBlock) {
  const dirPath = 'trace/' + sourceHex + '-' + startBlock
  await createDirectory(dirPath)
  const taintedFilePath = dirPath + '/tainted'
  const taintedFileData = sourceHex + '|' + startBlock + '\n'
  await initializeFile(taintedFilePath, taintedFileData)
  const tracedFilePath = dirPath + '/traced'
  await createEmptyFile(tracedFilePath)
}

/**
 * Record address tainted.
 * @param {string} sourceHex - Hex representation of source address.
 * @param {number} sourceStartBlock - Start block of source tainting.
 * @param {string} addressHex - Hex representation of tainted address.
 * @param {number} startBlock - Start block of tainting.
 * @return {undefined}
 */
async function recordTainted (sourceHex, sourceStartBlock, addressHex, startBlock) {
  await new Promise((resolve, reject) => {
    const filePath = 'trace/' + sourceHex + '-' + sourceStartBlock + '/tainted'
    const data = addressHex + '|' + startBlock + '\n'
    fs.appendFile(filePath, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Record address traced.
 * @param {string} sourceHex - Hex representation of source address.
 * @param {number} startBlock - Start block of tainting.
 * @param {string} addressHex - Hex representation of traced address.
 * @return {undefined}
 */
async function recordTraced (sourceHex, startBlock, addressHex) {
  await new Promise((resolve, reject) => {
    const filePath = 'trace/' + sourceHex + '-' + startBlock + '/traced'
    const data = addressHex + '\n'
    fs.appendFile(filePath, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Delete address traced.
 * @todo Improve efficiency of this procedure.
 * @param {string} sourceHex - Hex representation of source address.
 * @param {number} startBlock - Start block of tainting.
 * @param {string} addressHex - Hex representation of address needing new tracing.
 * @return {undefined}
 */
async function deleteTraced (sourceHex, startBlock, addressHex) {
  const filePath = 'trace/' + sourceHex + '-' + startBlock + '/traced'
  const fileData = await readFile(filePath)
  const fileLines = fileData.split('\n')
  const newLines = []
  for (let i = 0, line; i < fileLines.length; i++) {
    line = fileLines[i]
    if (line !== addressHex) {
      newLines.append(line)
    }
  }
  const newData = newLines.join('\n')
  await writeFile(filePath, newData)
}

/**
 * Process a transaction.
 */
async function processTransaction (
  tracker,
  taint,
  source,
  sourceStartBlock,
  address,
  tx,
  tainted,
  taintedFrom,
  traced
) {
  // No target
  if (tx.to === null) {
    return
  }

  // Input
  if (tx.to === address) {
    return
  }

  // No value
  if (tx.amount.wei.equals(0)) {
    return
  }

  // Already propagated
  if (tx.hasTaint(taint)) {
    return
  }

  // Record propagated
  tx.addTaint(taint)

  // Add to tainted list
  tainted.add(tx.to)

  // Already tainted
  if (tx.to.hasTaint(taint)) {
    if (taintedFrom.get(tx.to) > tx.block.number) {
      taintedFrom.set(tx.to, tx.block.number)
      traced.delete(tx.to)
      await deleteTraced(source.hex, sourceStartBlock, tx.to.hex)
      tracker.emit('reopenTrace', tx.to, taint)
    }
    return
  }

  // Record tainted
  taint.addRecipient(tx.to)
  tx.to.addTaint(taint)
  taintedFrom.set(tx.ot, tx.block.number)
  await recordTainted(source.hex, sourceStartBlock, tx.to.hex, tx.block.number)

  // Emit tainted
  tracker.emit('taint', tx.to, taint)
}

/**
 * New address tainted.
 * @event Tracker#taint
 * @type {Array}
 * @prop {module:primitives/address.Address} 0
 *     Tainted address.
 * @prop {module:primitives/taint.Taint} 1
 *     Propagated taint.
 */

/**
 * Acquiring page of transactions for tainted address.
 * @event Tracker#page
 * @type {Array}
 * @prop {module:primitives/address.Address} 0
 *     Tainted address.
 * @prop {number} 1
 *     Page number.
 */

/**
 * Processed transaction for tainted address.
 * @event Tracker#processedTransaction
 * @type {Array}
 * @prop {module:primitives/address.Address} 0
 *     Tainted address.
 * @prop {module:primitives/transaction.Transaction} 1
 *     Processed transaction.
 */

/**
 * Traced tainted address.
 * @event Tracker#tracedAddress
 * @type {Array}
 * @prop {module:primitives/address.Address} 0
 *     Tainted address.
 */

/**
 * Ethereum taint tracker.
 * @static
 * @emits Tracker#taint
 */
class Tracker extends EventEmitter {
  /**
   * No parameters.
   */
  constructor () {
    super()
    const priv = {}
    privs.set(this, priv)
    priv.cache = {
      block: new Cache(),
      address: new Cache(),
      tx: new Cache()
    }
    priv.chain = new ChainAgent(priv.cache)
    priv.pageSize = 50
    priv.tracing = false
    priv.canceling = false
  }

  /**
   * Request cancelation of a trace.
   * @return {undefined}
   */
  async cancelTrace () {
    const priv = privs.get(this)
    let res
    const prom = new Promise(resolve => { res = resolve })
    priv.canceling = res
    return prom
  }

  /**
   * Trace addresses tainted by specified source.
   * Starts asynchronous acquisition of all descendant tainting.
   * Each newly tainted address fires {@link event:Tracker#taint}.
   * Runs until extant chain data is exhausted.
   * Returned promise resolves when finished.
   * @todo Detect and use extant taint with same source.
   * @param {string} sourceHex
   *     Source address of taint. As an address hex.
   * @param {number} [startBlock=0]
   *     Start block of taint.
   * @return {undefined}
   */
  async traceAddresses (sourceHex, startBlock = 0) {
    // Validate arguments
    arg.addressHex(sourceHex)

    // Process arguments
    sourceHex = sourceHex.toLowerCase()

    // Private members
    const priv = privs.get(this)
    const cache = priv.cache
    const chain = priv.chain
    const pageSize = priv.pageSize
    if (priv.tracing) {
      throw new Error('Already tracing')
    }
    priv.tracing = true

    // Watch for trace failure
    try {
      // Get address
      let source = await cache.address.get(sourceHex)
      if (source === undef) {
        source = new Address(sourceHex)
        await cache.address.set(sourceHex, source)
      }

      // Create taint
      const taint = new Taint(source)
      source.addTaint(taint)

      // Working data
      const tainted = new Set()
      tainted.add(source)
      const taintedFrom = new Map()
      taintedFrom.set(source, startBlock)
      const traced = new Set()

      // Trace saving
      if (await saveExists(sourceHex, startBlock)) {
        const dirPath = 'trace/' + sourceHex + '-' + startBlock
        const taintedFilePath = dirPath + '/tainted'
        const taintedFileData = await readFile(taintedFilePath)
        const taintedFileLines = taintedFileData.split('\n')
        for (
          let i = 1, line, fields,
            addressHex, address,
            fromBlockString, fromBlock;
          i < taintedFileLines.length;
          i++
        ) {
          line = taintedFileLines[i]
          if (!line) continue
          fields = line.split('|')
          addressHex = fields[0]
          address = await cache.address.get(addressHex)
          if (address === undef) {
            address = new Address(addressHex)
            await cache.address.set(addressHex, address)
          }
          address.addTaint(taint)
          taint.addRecipient(address)
          tainted.add(address)
          fromBlockString = fields[1]
          fromBlock = Number.parseInt(fromBlockString)
          taintedFrom.set(address, fromBlock)
          this.emit('taint', address, taint)
        }
        const tracedFilePath = dirPath + '/traced'
        const tracedFileData = await readFile(tracedFilePath)
        const tracedFileLines = tracedFileData.split('\n')
        for (
          let i = 0, line,
            addressHex, address;
          i < tracedFileLines.length;
          i++
        ) {
          line = tracedFileLines[i]
          if (!line) continue
          addressHex = line
          address = await cache.address.get(addressHex)
          if (address === undef) {
            address = new Address(addressHex)
            await cache.address.set(addressHex, address)
          }
          traced.add(address)
          this.emit('tracedAddress', address)
        }
      } else {
        await initializeSave(sourceHex, startBlock)
      }

      // Trace
      for (
        let address = getTaintedUntraced(tainted, traced),
          fromBlockNumber;
        address !== null;
        traced.add(address),
        address = getTaintedUntraced(tainted, traced)
      ) {
        // Detect canceling
        if (priv.canceling) {
          priv.tracing = false
          priv.canceling()
          priv.canceling = false
          return
        }

        // Get address transactions
        let txs, numTxs, tx
        let page = 1
        do {
          // Detect canceling
          if (priv.canceling) {
            priv.tracing = false
            priv.canceling()
            priv.canceling = false
            return
          }

          // Get tainted from block number
          fromBlockNumber = taintedFrom.get(address)

          // Get next page of transactions
          this.emit(
            'page',
            address,
            page
          )
          txs = await chain
            .listAccountTransactions(address.hex, {
              startBlock: fromBlockNumber,
              page,
              pageSize
            })
          numTxs = txs.length

          // Process transactions
          for (var i = 0; i < numTxs; i++) {
            // Detect canceling
            if (priv.canceling) {
              priv.tracing = false
              priv.canceling()
              priv.canceling = false
              return
            }

            tx = txs[i]
            await processTransaction(
              this,
              taint,
              source,
              startBlock,
              address,
              tx,
              tainted,
              taintedFrom,
              traced
            )
            this.emit(
              'processedTransaction',
              address,
              tx
            )
          }

          // Increment page number
          page++
        } while (numTxs === pageSize)

        // Emit traced
        this.emit(
          'tracedAddress',
          address
        )

        // Record traced
        await recordTraced(sourceHex, startBlock, address.hex)
      }

      // End tracing
      priv.tracing = false
      priv.canceling = false
    } catch (e) {
      priv.tracing = false
      throw e
    }
  }
}

// Expose
module.exports = Tracker

// Circular imports
const arg = require('../util/arg')
