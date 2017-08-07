#!/usr/bin/env node

'use strict'

// Imports
const version = require('project-version')
const program = require('commander')
const ethtaint = require('..')

// Configure interface
program
  .version(version)
  .description('Taint tracking for Ethereum.')
  .arguments('<address>')
  .usage('<address>')
  .parse(process.argv)

// Extract address argument
const addressHex = program.args[0]
if (!addressHex) {
  program.help()
}

// Trace taint from specified address
async function traceAddresses (addressHex) {
  console.log('Tracing taint from: ' + addressHex)
  const tracker = new ethtaint.Tracker()
  try {
    tracker.on('taint', address => {
      console.log('Tainted ' + address.hex)
    })
    await tracker.traceAddresses(addressHex)
  } catch (e) {
    console.log(e.toString())
  }
}
traceAddresses(addressHex)
