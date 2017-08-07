// Import AVA
import test from 'ava'

// Imports
import Client from '../../src/client/etherscan-throttled'

/**
 * Create a new throttled Etherscan API client.
 */
test('create', t => {
  t.notThrows(() => {
    new Client()
  })
})
