// Import AVA
import test from 'ava'

// Imports
import Block from '../../src/primitives/block'

// Test data
const testBlockNumber = 56

/**
 * Create a new block.
 */
test('create', t => {
  t.notThrows(() => {
    new Block(testBlockNumber)
  })
})
