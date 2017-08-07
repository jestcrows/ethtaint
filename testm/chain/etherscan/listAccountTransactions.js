// Import AVA
import test from 'ava'

// Imports
import Cache from '../../../src/cache/cache'
import ChainAgent from '../../../src/chain/etherscan'

// Test data
const testAddress = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

/**
 * Make new cache.
 */
function makeCache () {
  return {
    block: new Cache(),
    address: new Cache(),
    tx: new Cache()
  }
}

/**
 * Valid used address.
 */
test.serial('valid used address', async t => {
  console.log('Acquire with valid used address')
  const cache = makeCache()
  const chain = new ChainAgent(cache)
  const prom = chain
    .listAccountTransactions(testAddress)
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs !== 0)
})
