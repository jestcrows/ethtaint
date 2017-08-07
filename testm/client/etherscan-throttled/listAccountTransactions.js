// Import AVA
import test from 'ava'

// Imports
import Client from '../../../src/client/etherscan-throttled'

// Test data
const testAddress = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

/**
 * Throttle requests.
 */
test('throttle requests', async t => {
  const client = new Client()
  const pageSize = 10
  const proms = []
  var page, prom
  for (page = 1; page <= 10; page++) {
    console.log('Requesting page ' + page)
    prom = client
      .listAccountTransactions(testAddress, {
        pageSize,
        page
      })
    proms.push(prom)
  }
  for (var i = 0; i < proms.length; i++) {
    page = i + 1
    prom = proms[i]
    await t.notThrows(prom)
    const txs = await prom
    const numTxs = txs.length
    console.log('Found ' + numTxs + ' txs on page ' + page)
  }
})
