// Import AVA
import test from 'ava'

// Imports
import Client from '../../src/client/etherscan'

// Test data
const testAddress = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

/**
 * Create a new Etherscan API client.
 */
test('create', t => {
  t.notThrows(() => {
    new Client()
  })
})
