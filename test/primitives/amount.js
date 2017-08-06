// Import AVA
import test from 'ava'

// Imports
import Amount from '../../src/primitives/amount'
import BigNumber from 'bignumber.js'

// Test data
const testNumber = 78953232838845586724
const testValue = '78953232838845586724'
const testValueEther = '78.95323284'

/**
 * Value must be BigNumber.
 */
test('value must be BigNumber', t => {
  t.throws(() => {
    new Amount(testNumber)
  })
})

/**
 * Create a new amount.
 */
test('create', t => {
  const value = new BigNumber(testValue)
  t.notThrows(() => {
    new Amount(value)
  })
})

/**
 * Access value in wei.
 */
test('access wei', t => {
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  t.true(amount.wei.equals(value))
})

/**
 * Access value in ether.
 */
test('access ether', t => {
  const value = new BigNumber(testValue)
  const amount = new Amount(value)
  const ether = amount.ether
  t.true(ether.toFixed() === testValueEther)
})
