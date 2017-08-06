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

/**
 * Set item.
 */
test('set item', async t => {
  const cache = new Cache()
  await t.notThrows(async () => {
    await cache.set('testkey', 'testval')
  })
})
