// Import AVA
import test from 'ava'

// Imports
import Tracker from '../../src/tracker/tracker'

// Test data
const testAddress = '0xD725f517EfdC47e24de8CdAB5DE4BfF3886E49F1'

/**
 * Trace addresses.
 */
test('trace addresses', async t => {
  const tracker = new Tracker()
  const sourceHex = testAddress
  const tainted = new Set()
  let numTxsProcessed = 0
  let numAddressesTraced = 0
  tracker.on('page', (address, page) => {
    console.log('Getting ' + address.hex + ' page ' + page)
  })
  tracker.on('processedTransaction', (address, tx) => {
    numTxsProcessed++
    console.log('Processed ' + numTxsProcessed + ' txs')
  })
  tracker.on('tracedAddress', address => {
    numAddressesTraced++
    console.log('Traced ' + numAddressesTraced + ' addresses')
  })
  tracker.on('taint', (address, taint) => {
    tainted.add(address)
    console.log('Tainted ' + address.hex + ' ' + tainted.size)
  })
  const prom = tracker.traceAddresses(sourceHex)
  await t.notThrows(prom)
})
