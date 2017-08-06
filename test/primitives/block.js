// Import AVA
import test from 'ava'

// Imports
import Block from '../../src/primitives/block'

// Test data
const testBlockNumber = 56

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
