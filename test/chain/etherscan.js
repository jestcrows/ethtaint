// Import AVA
import test from 'ava'

// Imports
import Cache from '../../src/cache/cache'
import ChainAgent from '../../src/chain/etherscan'

/**
 * Create a new Etherscan chain agent.
 */
test('create', t => {
  const cache = {
    block: new Cache(),
    address: new Cache(),
    tx: new Cache()
  }
  t.notThrows(() => {
    new ChainAgent(cache)
  })
})
