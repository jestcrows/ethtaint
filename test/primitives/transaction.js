// Import AVA
import test from 'ava'

// Imports
import Transaction from '../../src/primitives/transaction'
import Block from '../../src/primitives/block'

// Test data
const testBlockNumber = 56

/**
 * Cannot create without block.
 */
test('block must be Block', t => {
  t.throws(() => {
    new Transaction('test')
  })
})

/**
 * Create a new transaction.
 */
test('create', t => {
  const block = new Block(testBlockNumber)
  t.notThrows(() => {
    new Transaction(block)
  })
})

/**
 * Get block.
 */
test('get block', t => {
  const block = new Block(testBlockNumber)
  const tx = new Transaction(block)
  t.true(tx.block === block)
})

/**
 * Block protected.
 */
test('block protected', t => {
  const block = new Block(testBlockNumber)
  const tx = new Transaction(block)
  t.throws(() => {
    tx.block = 'test'
  })
})
