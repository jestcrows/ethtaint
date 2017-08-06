// Import AVA
import test from 'ava'

// Imports
import Amount from '../../src/primitives/amount'
import BigNumber from 'bignumber.js'

// Test data
const testNumber = 78953286724
const testValue = '78953286724'

/**
 * Value must be BigNumber.
 */
test('value must be BigNumber', t => {
  const number = 8
  t.throws(() => {
    new Amount(number)
  })
})

/**
 * Create a new amount.
 */
test('create', t => {
  const value = new BigNumber('8')
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
