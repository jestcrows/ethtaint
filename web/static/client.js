/**
 * @file Client logic for the ethtaint web interface.
 * @module web/client
 */

(() => {
  'use strict'

  // Constants
  const portIo = 7403

  $(() => {
    // State
    let tracing = false

    // Connect to server
    const socket = io.connect('http://localhost:' + portIo)

    // Counts
    let tainted = 0
    let traced = 0
    let txs = 0

    // Elements
    const taintedEl = document.getElementById('Tainted')
    const tracedEl = document.getElementById('Traced')
    const txsEl = document.getElementById('Txs')
    const listEl = document.getElementById('TaintedList')
    const sourceEl = document.getElementById('Source')
    const traceEl = document.getElementById('Trace')
    const stopEl = document.getElementById('Stop')

    // Stopped
    function stopped () {
      sourceEl.disabled = false
      traceEl.disabled = false
      stopEl.disabled = true
    }

    // Started
    function started () {
      sourceEl.disabled = true
      traceEl.disabled = true
      stopEl.disabled = false
    }

    // Click Trace
    traceEl.onclick = function startTrace () {
      tracing = true
      started()
      tainted = 1
      traced = 0
      txs = 0
      taintedEl.innerText = '1'
      tracedEl.innerText = ''
      txsEl.innerText = ''
      $(listEl).empty()
      const sourceHex = sourceEl.value
      const sourceHexLower = sourceHex.toLowerCase()
      $('<div class="tainted" id="' + sourceHexLower + '">' +
        sourceHexLower + '</div>')
        .appendTo(listEl)
      socket.emit('trace', sourceHex)
    }

    // Click Stop
    stopEl.onclick = function stopTrace () {
      socket.emit('stop')
    }

    // Found tainted address
    socket.on('taint', address => {
      tainted++
      taintedEl.innerText = tainted.toString()
      $('<div class="tainted" id="' + address + '">' +
        address + '</div>')
        .appendTo(listEl)
    })

    // Traced address
    socket.on('tracedAddress', address => {
      traced++
      tracedEl.innerText = traced.toString()
      console.log('Traced ' + address)
      const item = document.getElementById(address)
      if (item) {
        item.className = 'traced'
      }
    })

    // Processed transaction
    socket.on('processedTransaction', () => {
      txs++
      txsEl.innerText = txs.toString()
    })

    // Trace complete
    socket.on('done', () => {
      console.log('Trace complete')
      tracing = false
      stopped()
    })

    // Trace error
    socket.on('fail', message => {
      console.log('Trace error: ' + message)
      tracing = false
      stopped()
    })
  })
})()
