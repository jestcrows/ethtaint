// Import AVA
import test from 'ava'

// Imports
import Transaction from '../../src/primitives/transaction'
import Block from '../../src/primitives/block'
import Address from '../../src/primitives/address'
import Amount from '../../src/primitives/amount'
import Taint from '../../src/primitives/taint'
import BigNumber from 'bignumber.js'

// Test data
const testBlockNumber = 56
const testTransactionHash
  = '0x17eb022fd747ad89211c5384af50b87816332f4cc708dae6319040816b3d67e5'
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testAddress2 = '0xe2652A4d678208BbC7f72f92Fb87Ce885BBfBf2f'
const testAddress3 = '0x5E32E35cbE13D8997C12Df99424eF8b1D7BEdC06'
const testAddress4 = '0xC82bE38B3c78453f7D16Db8b110886E25B5fCEf8'
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

/**
 * Get from.
 */
test('get from', t => {
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
  t.true(tx.from === from)
})

/**
 * From protected.
 */
test('from protected', t => {
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
    tx.from = 'test'
  })
})

/**
 * Get to.
 */
test('get to', t => {
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
  t.true(tx.to === to)
})

/**
 * To protected.
 */
test('to protected', t => {
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
    tx.to = 'test'
  })
})

/**
 * Get amount.
 */
test('get amount', t => {
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
  t.true(tx.amount.wei.equals(amount.wei))
})

/**
 * Amount protected.
 */
test('amount protected', t => {
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
    tx.amount = 'test'
  })
})

/**
 * Get empty taints.
 */
test('get empty taints', t => {
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
  const taints = tx.taints
  t.true(taints instanceof Set && taints.size === 0)
})

/**
 * Taints protected.
 */
test('taints protected', t => {
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
    tx.taints = 'test'
  })
})

/**
 * Add taint item.
 */
test('add taint', t => {
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
  const source = new Address(testAddress3)
  const taint = new Taint(source)
  t.notThrows(() => {
    tx.addTaint(taint)
  })
})

/**
 * Chain after adding taint item.
 */
test('chain add taint', t => {
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
  const source = new Address(testAddress3)
  const taint = new Taint(source)
  t.true(tx.addTaint(taint) === tx)
})

/**
 * Count of propagated taint.
 */
test('count taint', t => {
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
  const source = new Address(testAddress3)
  const taint = new Taint(source)
  tx.addTaint(taint)
  t.true(tx.taints.size === 1)
})

/**
 * Access propagated taint.
 */
test('access taint', t => {
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
  const source = new Address(testAddress3)
  const taint = new Taint(source)
  tx.addTaint(taint)
  const taints = tx.taints
  const values = [...taints]
  t.true(values[0] === taint)
})

/**
 * No taint when empty.
 */
test('no taint', t => {
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
  const source = new Address(testAddress3)
  const taint = new Taint(source)
  t.false(tx.hasTaint(taint))
})

/**
 * Unrelated taint not propagated.
 */
test('free of unrelated taint', t => {
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
  const source = new Address(testAddress3)
  const taint = new Taint(source)
  tx.addTaint(taint)
  const source2 = new Address(testAddress4)
  const taint2 = new Taint(source2)
  t.false(tx.hasTaint(taint2))
})

/**
 * Has added taint.
 */
test('has added taint', t => {
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
  const source = new Address(testAddress3)
  const taint = new Taint(source)
  tx.addTaint(taint)
  t.true(tx.hasTaint(taint))
})
