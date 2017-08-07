// Import AVA
import test from 'ava'

// Imports
import Tracker from '../../src/tracker/tracker'

/**
 * Create a new tracker.
 */
test('create', t => {
  t.notThrows(() => {
    new Tracker()
  })
})
