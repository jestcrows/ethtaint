// Import AVA
import test from 'ava'

// Imports
import arg from '../../src/util/arg'
import Address from '../../src/primitives/address'
import Block from '../../src/primitives/block'
import Taint from '../../src/primitives/taint'

// Test data
const testAddress = '0xe148E5AA46401b7bEe89D1F6103776ba508024e0'
const testBlockNumber = 56

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

/**
 * Succeed Block.
 */
test('succeed Block', t => {
  const block = new Block(testBlockNumber)
  t.notThrows(() => {
    arg.Block(block)
  })
})

/**
 * Fail Block.
 */
test('fail Block', t => {
  t.throws(() => {
    arg.Block('test')
  })
})

/**
 * Succeed Taint.
 */
test('succeed Taint', t => {
  const source = new Address(testAddress)
  const taintItem = new Taint(source)
  t.notThrows(() => {
    arg.Taint(taintItem)
  })
})

/**
 * Fail Taint.
 */
test('fail Taint', t => {
  t.throws(() => {
    arg.Taint('test')
  })
})
