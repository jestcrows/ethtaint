// Import AVA
import test from 'ava'

// Imports
import Address from '../../src/primitives/address'
import Taint from '../../src/primitives/taint'
import Block from '../../src/primitives/block'
import Transaction from '../../src/primitives/transaction'
import Amount from '../../src/primitives/amount'
import BigNumber from 'bignumber.js'

// Test data
const testBlockNumber = 56
const testBlockNumber2 = 832
const testTransactionHash
  = '0x17eb022fd747ad89211c5384af50b87816332f4cc708dae6319040816b3d67e5'
const testTransactionHash2
  = '0x160c82c7a7b248fb1b8a2be0284916944a441d91bd3830f710c007ba0ad78070'
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testAddress2 = '0xe2652A4d678208BbC7f72f92Fb87Ce885BBfBf2f'
const testAddress3 = '0x5E32E35cbE13D8997C12Df99424eF8b1D7BEdC06'
const testAddress4 = '0xC82bE38B3c78453f7D16Db8b110886E25B5fCEf8'
const testAddress5 = '0x0589146f7273E5B23fE54a762a3f1B008CAf313B'
const testValue = '78953232838845586724'
const testValue2 = '52387028750987509378'

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

/**
 * No recipient when empty.
 */
test('no recipient', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  const address2 = new Address(testAddress2)
  t.false(taintItem.hasRecipient(address2))
})

/**
 * Unrelated address not possessed as recipient.
 */
test('unrelated address not recipient', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  const address3 = new Address(testAddress3)
  t.false(taintItem.hasRecipient(address3))
})

/**
 * Has added recipient.
 */
test('has added recipient', t => {
  const address = new Address(testAddress)
  const taintItem = new Taint(address)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  t.true(taintItem.hasRecipient(address2))
})

/**
 * Single address at start.
 */
test('start with single address', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const addresses = taintItem.addresses
  t.true(addresses instanceof Set && addresses.size === 1)
})

/**
 * Addresses protected.
 */
test('addresses protected', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  t.throws(() => {
    taintItem.addresses = 'test'
  })
})

/**
 * Count of addresses.
 */
test('count addresses', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  t.true(taintItem.addresses.size === 2)
})

/**
 * Access added address.
 */
test('access address', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  const addresses = taintItem.addresses
  const values = [...addresses]
  t.true(values[1] === address2)
})

/**
 * Has source address.
 */
test('has source address', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  t.true(taintItem.hasAddress(source))
})

/**
 * No address when recipients empty.
 */
test('no address', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const address2 = new Address(testAddress2)
  t.false(taintItem.hasAddress(address2))
})

/**
 * Unrelated address not possessed.
 */
test('unrelated address not possessed', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  const address3 = new Address(testAddress3)
  t.false(taintItem.hasAddress(address3))
})

/**
 * Has added address.
 */
test('has added address', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const address2 = new Address(testAddress2)
  taintItem.addRecipient(address2)
  t.true(taintItem.hasAddress(address2))
})

/**
 * Get empty transactions.
 */
test('get empty transactions', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const transactions = taintItem.transactions
  t.true(transactions instanceof Set && transactions.size === 0)
})

/**
 * Get empty transactions through #txs.
 */
test('get empty transactions through #txs', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  const txs = taintItem.txs
  t.true(txs instanceof Set && txs.size === 0)
})

/**
 * Transactions protected.
 */
test('transactions protected', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  t.throws(() => {
    taintItem.transactions = 'test'
  })
})

/**
 * Add transaction.
 */
test('add transaction', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  const source = new Address(testAddress5)
  const taintItem = new Taint(source)
  t.notThrows(() => {
    taintItem.addTransaction(tx)
  })
})

/**
 * Chain after adding transaction.
 */
test('chain add transaction', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  const source = new Address(testAddress5)
  const taintItem = new Taint(source)
  t.true(taintItem.addTransaction(tx) === taintItem)
})

/**
 * Count of transactions.
 */
test('count transactions', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  const source = new Address(testAddress5)
  const taintItem = new Taint(source)
  taintItem.addTransaction(tx)
  t.true(taintItem.transactions.size === 1)
})

/**
 * Access added transaction.
 */
test('access transaction', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const tx = new Transaction(
    block,
    hash,
    from,
    to,
    amount
  )
  const source = new Address(testAddress5)
  const taintItem = new Taint(source)
  taintItem.addTransaction(tx)
  const txs = taintItem.transactions
  const values = [...txs]
  t.true(values[0] === tx)
})
