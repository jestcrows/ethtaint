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
const testEndBlock = 101250
const testPageSize = 8

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

/**
 * Valid end block.
 */
test.serial('valid end block', async t => {
  console.log('Acquire with valid end block')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      endBlock: testEndBlock
    })
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs !== 0)
})

/**
 * Bad end block.
 */
test.serial('bad end block', async t => {
  console.log('Acquire with bad end block')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      endBlock: 'test'
    })
  await t.throws(prom)
})

/**
 * Start and end blocks.
 */
test.serial('start and end blocks', async t => {
  console.log('Acquire with start and end blocks')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      startBlock: testStartBlock,
      endBlock: testEndBlock
    })
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs !== 0)
})

/**
 * First page.
 */
test.serial('first page', async t => {
  console.log('Acquiring first page')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      page: 1,
      pageSize: testPageSize
    })
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs === testPageSize)
})

/**
 * Second page.
 */
test.serial('second page', async t => {
  console.log('Acquiring second page')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      page: 2,
      pageSize: testPageSize
    })
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs === testPageSize)
})

/**
 * Empty page.
 */
test.serial('empty page', async t => {
  console.log('Acquiring empty page')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      page: 10000,
      pageSize: 9000
    })
  await t.notThrows(prom)
  const txs = await prom
  const numTxs = txs.length
  console.log('Found ' + numTxs + ' txs')
  t.true(numTxs === 0)
})

/**
 * Bad page number.
 */
test.serial('bad page number', async t => {
  console.log('Acquiring with bad page number')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      page: 'test'
    })
  await t.throws(prom)
})

/**
 * Bad page size.
 */
test.serial('bad page size', async t => {
  console.log('Acquiring with bad page size')
  const client = new Client()
  const prom = client
    .listAccountTransactions(testAddress, {
      pageSize: 'test'
    })
  await t.throws(prom)
})
