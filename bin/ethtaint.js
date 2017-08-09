#!/usr/bin/env node

'use strict'

// Imports
const fs = require('fs')
const mkdirp = require('mkdirp')
const version = require('project-version')
const program = require('commander')
const logUpdate = require('log-update')
const ethtaint = require('..')

// Configure interface
program
  .version(version)
  .description('Taint tracking for Ethereum.')
  .arguments('<address> [startBlock]')
  .usage('<address> [startBlock]')
  .parse(process.argv)

// Extract address argument
const sourceHex = program.args[0]
if (!sourceHex) {
  program.help()
}

// Extract start block argument
const startBlockString = program.args[1]
let startBlock
if (startBlockString) {
  startBlock = Number.parseInt(startBlockString)
  if (Number.isNaN(startBlock)) {
    console.log('Start block number be an integer')
    program.help()
  }
}

// Output machinery
let tainted = 1
let traced = 0
let txs = 0
function update () {
  let s = 'Tainted ' + tainted
  s += ' / Traced ' + traced
  s += ' / Txs ' + txs
  logUpdate(s)
}
function log () {
  logUpdate.clear()
  console.log(...arguments)
  update()
}

// Trace taint from specified address
mkdirp.sync('trace')
const fileName = 'trace/' + sourceHex
async function traceAddresses (sourceHex, startBlock) {
  log()
  let msg = 'Tracing taint from: ' + sourceHex
  if (startBlock) {
    msg += ' ' + startBlock
  }
  log(msg)
  update()
  fs.writeFileSync(fileName, sourceHex + '\n')
  const tracker = new ethtaint.Tracker()
  try {
    tracker.on('taint', address => {
      tainted++
      log(address.hex)
      fs.appendFileSync(fileName, address.hex + '\n')
    })
    tracker.on('tracedAddress', address => {
      traced++
      update()
    })
    tracker.on('processedTransaction', () => {
      txs++
      update()
    })
    await tracker.traceAddresses(sourceHex, startBlock)
    logUpdate.done()
  } catch (e) {
    log(e.toString())
  }
}
traceAddresses(sourceHex, startBlock)
