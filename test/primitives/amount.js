// Import AVA
import test from 'ava'

// Imports
import Amount from '../../src/primitives/amount'
import BigNumber from 'bignumber.js'

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
