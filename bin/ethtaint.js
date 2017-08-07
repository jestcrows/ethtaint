#!/usr/bin/env node

'use strict'

// Imports
const version = require('project-version')
const program = require('commander')
const logUpdate = require('log-update')
const ethtaint = require('..')

// Configure interface
program
  .version(version)
  .description('Taint tracking for Ethereum.')
  .arguments('<address>')
  .usage('<address>')
  .parse(process.argv)

// Extract address argument
const sourceHex = program.args[0]
if (!sourceHex) {
  program.help()
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
async function traceAddresses (sourceHex) {
  log('Tracing taint from: ' + sourceHex)
  update()
  const tracker = new ethtaint.Tracker()
  try {
    tracker.on('taint', address => {
      tainted++
      log(address.hex)
    })
    tracker.on('tracedAddress', address => {
      traced++
      update()
    })
    tracker.on('processedTransaction', () => {
      txs++
      update()
    })
    await tracker.traceAddresses(sourceHex)
    logUpdate.done()
  } catch (e) {
    log(e.toString())
  }
}
traceAddresses(sourceHex)
