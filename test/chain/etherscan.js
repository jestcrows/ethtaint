// Import AVA
import test from 'ava'

// Imports
import ChainAgent from '../../src/chain/etherscan.js'

/**
 * Create a new Etherscan chain agent.
 */
test('create', t => {
  t.notThrows(() => {
    new ChainAgent()
  })
})
