// Import AVA
import test from 'ava'

// Imports
import Address from '../../src/primitives/address'
import Taint from '../../src/primitives/taint'

// Test data
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testAddress2 = '0xe2652A4d678208BbC7f72f92Fb87Ce885BBfBf2f'

/**
 * Hex must be addressHex.
 */
test('hex must be address hex', t => {
  t.throws(() => {
    new Address('test')
  })
})

/**
 * Create a new address.
 */
test('create', t => {
  t.notThrows(() => {
    new Address(testAddress)
  })
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
  t.true(taint instanceof Set && taint.size === 0)
})

/**
 * Taint protected.
 */
test('taint protected', t => {
  const address = new Address(testAddress)
  t.throws(() => {
    address.taint = 'test'
  })
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
  t.true(address.taint.size === 1)
})

/**
 * Access acquired taint.
 */
test('access taint', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  address.addTaint(taintItem)
  const taint = address.taint
  const values = [...taint]
  t.true(values[0] === taintItem)
})

/**
 * No taint possessed when empty.
 */
test('no taint', t => {
  const address = new Address(testAddress)
  const address2 = new Address(testAddress2)
  const taintItem = new Taint(address2)
  t.false(address.hasTaint(taintItem))
})

/**
 * Unrelated taint not possessed.
 */
test('free of unrelated taint', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  address.addTaint(taintItem)
  const address2 = new Address(testAddress2)
  const taintItem2 = new Taint(address2)
  t.false(address.hasTaint(taintItem2))
})

/**
 * Has added taint.
 */
test('has added taint', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  address.addTaint(taintItem)
  t.true(address.hasTaint(taintItem))
})
