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
