// Import AVA
import test from 'ava'

// Imports
import Address from '../../src/primitives/address'

// Test data
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'

/**
 * Create a new address.
 */
test('create', t => {
  new Address(testAddress)
  t.pass()
})

/**
 * Get hex representation.
 */
test('get hex', t => {
  const address = new Address(testAddress)
  const hex = address.hex
  t.true(hex === testAddress)
})

/**
 * Cannot set hex representation.
 */
test('cannot set hex', t => {
  const address = new Address(testAddress)
  t.throws(() => {
    address.hex = 'test'
  })
})
