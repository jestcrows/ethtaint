// Import AVA
import test from 'ava'

// Imports
import Cache from '../../src/cache/cache'

// Test data
const testKey = 'testkey'
const testValue = 'testvalue'

// Resources
var undefined

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

/**
 * Get unset item.
 */
test('get unset item', async t => {
  const cache = new Cache()
  const value = await cache.get('test')
  t.true(value === undefined)
})

/**
 * Get set item.
 */
test('get set item', async t => {
  const cache = new Cache()
  await cache.set(testKey, testValue)
  const value = await cache.get(testKey)
  t.true(value === testValue)
})

/**
 * Delete unset item.
 */
test('delete unset item', async t => {
  const cache = new Cache()
  await t.notThrows(async () => {
    await cache.delete(testKey)
  })
})

/**
 * Delete set item.
 */
test('delete set item', async t => {
  const cache = new Cache()
  await cache.set(testKey, testValue)
  await cache.delete(testKey)
  const value = await cache.get(testKey)
  t.true(value === undefined)
})

/**
 * Not has unset item.
 */
test('not has unset item', async t => {
  const cache = new Cache()
  t.false(await cache.has(testKey))
})

/**
 * Has set item.
 */
test('has set item', async t => {
  const cache = new Cache()
  await cache.set(testKey, testValue)
  t.true(await cache.has(testKey))
})

/**
 * Not has deleted item.
 */
test('not has deleted item', async t => {
  const cache = new Cache()
  await cache.set(testKey, testValue)
  await cache.delete(testKey)
  t.false(await cache.has(testKey))
})
