// Import AVA
import test from 'ava'

// Imports
import Amount from '../../src/primitives/amount'

/**
 * Create a new amount.
 */
test('create', t => {
  t.notThrows(() => {
    new Amount()
  })
})
