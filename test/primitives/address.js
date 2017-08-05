// Import AVA
import test from 'ava'

// Imports
import Address from '../../src/primitives/address'
import Taint from '../../src/primitives/taint'

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
 * Hex representation protected.
 */
test('hex protected', t => {
  const address = new Address(testAddress)
  t.throws(() => {
    address.hex = 'test'
  })
})

/**
 * Get empty taint.
 */
test('get empty taint', t => {
  const address = new Address(testAddress)
  const taint = address.taint
  t.true(Array.isArray(taint) && taint.length === 0)
})

/**
 * Add taint item.
 */
test('add taint', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  t.notThrows(() => {
    address.addTaint(taintItem)
  })
})

/**
 * Chain after adding taint item.
 */
test('chain add taint', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  t.true(address.addTaint(taintItem) === address)
})

/**
 * Count of acquired taint.
 */
test('count taint', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  address.addTaint(taintItem)
  t.true(address.taint.length === 1)
})

/**
 * Access acquired taint.
 */
test('access taint', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  address.addTaint(taintItem)
  const taint = address.taint
  t.true(taint[0] === taintItem)
})
