// Import AVA
import test from 'ava'

// Imports
import Block from '../../src/primitives/block'
import Address from '../../src/primitives/address'
import Amount from '../../src/primitives/amount'
import Transaction from '../../src/primitives/transaction'
import BigNumber from 'bignumber.js'

// Test data
const testBlockNumber = 56
const testTransactionHash
  = '0x17eb022fd747ad89211c5384af50b87816332f4cc708dae6319040816b3d67e5'
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testAddress2 = '0xe2652A4d678208BbC7f72f92Fb87Ce885BBfBf2f'
const testValue = '78953232838845586724'

/**
 * Number must be number.
 */
test('number must be number', t => {
  t.throws(() => {
    new Block('test')
  })
})

/**
 * Number must be integer.
 */
test('number must be integer', t => {
  t.throws(() => {
    new Block(5.8)
  })
})

/**
 * Create a new block.
 */
test('create', t => {
  t.notThrows(() => {
    new Block(testBlockNumber)
  })
})

/**
 * Get number.
 */
test('get number', t => {
  const block = new Block(testBlockNumber)
  t.true(block.number === testBlockNumber)
})

/**
 * Number protected.
 */
test('number protected', t => {
  const block = new Block(testBlockNumber)
  t.throws(() => {
    block.number = 'test'
  })
})

/**
 * Get empty transactions.
 */
test('get empty transactions', t => {
  const block = new Block(testBlockNumber)
  const transactions = block.transactions
  t.true(transactions instanceof Set && transactions.size === 0)
})

/**
 * Get empty transctions through #txs.
 */
test('get empty transactions through #txs', t => {
  const block = new Block(testBlockNumber)
  const txs = block.txs
  t.true(txs instanceof Set && txs.size === 0)
})

/**
 * Transactions protected.
 */
test('transactions protected', t => {
  const block = new Block(testBlockNumber)
  t.throws(() => {
    block.transactions = 'test'
  })
})

/**
 * Add transaction.
 */
test('add transaction', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  t.notThrows(() => {
    block.addTransaction(tx)
  })
})

/**
 * Chain after adding transaction.
 */
test('chain add transaction', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  t.true(block.addTransaction(tx) === block)
})

/**
 * Count of transactions.
 */
test('count transactions', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  block.addTransaction(tx)
  t.true(block.transactions.size === 1)
})

/**
 * Access added transaction.
 */
test('access transaction', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  block.addTransaction(tx)
  const txs = block.transactions
  const values = [...txs]
  t.true(values[0] === tx)
})
