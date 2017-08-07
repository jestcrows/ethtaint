// Import AVA
import test from 'ava'

// Imports
import sleep from '../../../src/util/sleep'
import Client from '../../../src/client/etherscan'

// Test data
const testAddress = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
const testUnusedAddress =
  '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testStartBlock = 79728

// Sleep before each test
test.beforeEach('rate limit', async t => {
  console.log()
  console.log('-- Rate limiting')
  console.log()
  await sleep(1000)
})

/**
 * Valid used address.
 */
test.serial('valid used address', async t => {
  console.log('Acquire with valid used address')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress)
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs !== 0)
})

/**
 * Valid unused address.
 */
test.serial('valid unused address', async t => {
  console.log('Acquire with valid unused address')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testUnusedAddress)
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs === 0)
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

/**
 * Valid start block.
 */
test.serial('valid start block', async t => {
  console.log('Acquire with valid start block')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      startBlock: testStartBlock
    })
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs !== 0)
})

/**
 * Bad start block.
 */
test.serial('bad start block', async t => {
  console.log('Acquire with bad start block')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      startBlock: 'test'
    })
  await t.throws(prom)
})
