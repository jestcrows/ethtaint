// Import AVA
import test from 'ava'

// Imports
import Client from '../../src/client/etherscan'

/**
 * Create a new Etherscan API client.
 */
test('create', t => {
  t.notThrows(() => {
    new Client()
  })
})
