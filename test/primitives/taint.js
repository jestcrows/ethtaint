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
