// Import AVA
import test from 'ava'

// Imports
import Block from '../../src/primitives/block'

/**
 * Create a new block.
 */
test('create', t => {
  t.notThrows(() => {
    new Block()
  })
})
