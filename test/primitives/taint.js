// Import AVA
import test from 'ava'

// Imports
import Address from '../../src/primitives/address'
import Taint from '../../src/primitives/taint'

// Test data
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testAddress2 = '0xe2652A4d678208BbC7f72f92Fb87Ce885BBfBf2f'

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

/**
 * Add recipient.
 */
test('add recipient', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  const address2 = new Address(testAddress2)
  t.notThrows(() => {
    taintItem.addRecipient(address2)
  })
})

/**
 * Chain after adding recipient.
 */
test('chain add recipient', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  const address2 = new Address(testAddress2)
  t.true(taintItem.addRecipient(address2) === taintItem)
})

/**
 * Count of recipients.
 */
test('count recipients', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  t.true(taintItem.recipients.size === 1)
})

/**
 * Access added recipient.
 */
test('access recipient', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  const recipients = taintItem.recipients
  const values = [...recipients]
  t.true(values[0] === address2)
})
