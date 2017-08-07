// Import AVA
import test from 'ava'

// Imports
import sleep from '../../../src/util/sleep'
import Client from '../../../src/client/etherscan'

// Test data
const testAddress = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// Sleep before each test
test.beforeEach('rate limit', async t => {
  console.log()
  console.log('-- Rate limiting')
  console.log()
  await sleep(1000)
})

/**
 * Valid address.
 */
test.serial('valid address', async t => {
  console.log('Acquire with valid address')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress)
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
})

/**
 * Bad address.
 */
test.serial('bad address', async t => {
  console.log('Acquire with bad address')
  const client = new Client()
  const prom = client
    .listAccountTransactions('test')
  await t.throws(prom)
})
