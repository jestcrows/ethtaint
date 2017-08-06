// Import AVA
import test from 'ava'

// Imports
import Cache from '../../src/cache/cache'

/**
 * Create a new cache.
 */
test('create', t => {
  t.notThrows(() => {
    new Cache()
  })
})
