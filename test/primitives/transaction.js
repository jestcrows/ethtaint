// Import AVA
import test from 'ava'

// Imports
import Transaction from '../../src/primitives/transaction'
import Block from '../../src/primitives/block'
import Address from '../../src/primitives/address'
import Amount from '../../src/primitives/amount'
import BigNumber from 'bignumber.js'

// Test data
const testBlockNumber = 56
const testTransactionHash
  = '0x17eb022fd747ad89211c5384af50b87816332f4cc708dae6319040816b3d67e5'
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testAddress2 = '0xe2652A4d678208BbC7f72f92Fb87Ce885BBfBf2f'
const testNumber = 78953232838845586724
const testValue = '78953232838845586724'

/**
 * Cannot create without block.
 */
test('block must be Block', t => {
  t.throws(() => {
    new Transaction('test')
  })
})

/**
 * Cannot create without transaction hash.
 */
test('hash must be transaction hash', t => {
  const block = new Block(testBlockNumber)
  const number = 8
  t.throws(() => {
    new Transaction(
      block,
      number
    )
  })
})

/**
 * Cannot create without from address.
 */
test('from must be Address', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  t.throws(() => {
    new Transaction(
      block,
      hash,
      'test'
    )
  })
})

/**
 * Cannot create without to address.
 */
test('to must be Address', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  t.throws(() => {
    new Transaction(
      block,
      hash,
      from,
      'test'
    )
  })
})

/**
 * Cannot create without amount.
 */
test('amount must be Amount', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  t.throws(() => {
    new Transaction(
      block,
      hash,
      from,
      to,
      testNumber
    )
  })
})

/**
 * Create a new transaction.
 */
test('create', t => {
  const block = new Block(testBlockNumber)
  const hash = testTransactionHash
  const from = new Address(testAddress)
  const to = new Address(testAddress2)
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  t.notThrows(() => {
    new Transaction(
      block,
      hash,
      from,
      to,
      amount
    )
  })
})

/**
 * Get block.
 */
test('get block', t => {
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
  t.true(tx.block === block)
})

/**
 * Block protected.
 */
test('block protected', t => {
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
  t.throws(() => {
    tx.block = 'test'
  })
})

/**
 * Get hash.
 */
test('get hash', t => {
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
  t.true(tx.hash === hash)
})

/**
 * Hash protected.
 */
test('hash protected', t => {
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
  t.throws(() => {
    tx.hash = 'test'
  })
})
