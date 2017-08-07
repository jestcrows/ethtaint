/**
 * @file Web interface to ethtaint.
 * @module web/server
 */

'use strict'

// Imports
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const ethtaint = require('..')

// Constants
const portWeb = 7403

// Resources
const app = express()
const server = http.Server(app)
const io = socketIo(server)

// Channel to client
let socket

// Tracing state
const tracker = new ethtaint.Tracker()
tracker.on('taint', address => {
  socket.emit('taint', address.hex)
})
tracker.on('tracedAddress', address => {
  socket.emit('tracedAddress', address.hex)
})
tracker.on('processedTransaction', () => {
  socket.emit('processedTransaction')
})
let tracing = false

// Start trace
async function traceAddresses (sourceHex) {
  socket.emit('msg', 'Tracing taint from: ' + sourceHex)
  try {
    await tracker.traceAddresses(sourceHex)
    socket.emit('done')
  } catch (e) {
    socket.emit('fail', e.toString())
  }
}

// Cancel trace
async function cancelTrace () {
  await tracker.cancelTrace()
  tracing = false
}

// IO connections
io.on('connection', sock => {
  console.log('Received IO connection')
  socket = sock

  socket.on('trace', sourceHex => {
    if (tracing) {
      cancelTrace()
    }
    tracing = true
    traceAddresses(sourceHex)
  })

  socket.on('stop', () => {
    if (!tracing) {
      return
    }
    cancelTrace()
  })
})

// Static files
app.use(express.static('web/static'))

// Listen
server.listen(portWeb, () => {
  console.log('ethtaint web interface listening on port ' +
    portWeb)
})
