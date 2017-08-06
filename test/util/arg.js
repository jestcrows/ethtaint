// Import AVA
import test from 'ava'

// Imports
import arg from '../../src/util/arg'
import Address from '../../src/primitives/address'

// Test data
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'

/**
 * Succeed Address.
 */
test('succeed Address', t => {
  const address = new Address(testAddress)
  t.notThrows(() => {
    arg.Address(address)
  })
})

/**
 * Fail Address.
 */
test('fail Address', t => {
  t.throws(() => {
    arg.Address('test')
  })
})
