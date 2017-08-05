// Import AVA
import test from 'ava'

// Imports
import Address from '../../src/primitives/address'
import Taint from '../../src/primitives/taint'

// Test data
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'

/**
 * Cannot create without Address source.
 */
test('source must be Address', t => {
  const source = 'test'
  t.throws(() => {
    new Taint(source)
  })
})

/**
 * Create a taint item.
 */
test('create', t => {
  const source = new Address(testAddress)
  t.notThrows(() => {
    new Taint(source)
  })
})

/**
 * Get source.
 */
test('get source', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const taintSource = taintItem.source
  t.true(taintSource.hex === source.hex)
})

/**
 * Source protected.
 */
test('source protected', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  t.throws(() => {
    taintItem.source = {}
  })
})

/**
 * Get empty recipients.
 */
test('get empty recipients', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const recipients = taintItem.recipients
  t.true(recipients instanceof Set && recipients.size === 0)
})

/**
 * Recipients protected.
 */
test('recipients protected', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  t.throws(() => {
    taintItem.recipients = 'test'
  })
})
