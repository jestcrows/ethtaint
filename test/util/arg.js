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
 * Succeed string.
 */
test('succeed string', t => {
  const string = 'test'
  t.notThrows(() => {
    arg.string(string)
  })
})

/**
 * Fail string.
 */
test('fail string', t => {
  const number = 1
  t.throws(() => {
    arg.string(number)
  })
})

/**
 * Succeed number.
 */
test('succeed number', t => {
  const number = 8
  t.notThrows(() => {
    arg.number(number)
  })
})

/**
 * Fail number.
 */
test('fail number', t => {
  const string = 'test'
  t.throws(() => {
    arg.number(string)
  })
})

/**
 * Fail number with NaN.
 */
test('fail number with NaN', t => {
  t.throws(() => {
    arg.number(Number.NaN)
  })
})

/**
 * Fail number with Infinity.
 */
test('fail number with Infinity', t => {
  t.throws(() => {
    arg.number(Number.POSITIVE_INFINITY)
  })
})

/**
 * Fail number with -Infinity.
 */
test('fail number with -Infinity', t => {
  t.throws(() => {
    arg.number(Number.NEGATIVE_INFINITY)
  })
})

/**
 * Succeed integer.
 */
test('succeed integer', t => {
  const integer = 8
  t.notThrows(() => {
    arg.integer(integer)
  })
})

/**
 * Fail integer with string.
 */
test('fail integer with string', t => {
  const string = 'test'
  t.throws(() => {
    arg.integer(string)
  })
})

/**
 * Fail integer with NaN.
 */
test('fail integer with NaN', t => {
  t.throws(() => {
    arg.integer(Number.NaN)
  })
})

/**
 * Fail integer with Infinity.
 */
test('fail integer with Infinity', t => {
  t.throws(() => {
    arg.integer(Number.POSITIVE_INFINITY)
  })
})

/**
 * Fail integer with -Infinity.
 */
test('fail integer with -Infinity', t => {
  t.throws(() => {
    arg.integer(Number.NEGATIVE_INFINITY)
  })
})

/**
 * Fail integer with float.
 */
test('fail integer with float', t => {
  const float = 5.8
  t.throws(() => {
    arg.integer(float)
  })
})

/**
 * Succeed addressHex.
 */
test('succeed addressHex', t => {
  t.notThrows(() => {
    arg.addressHex(testAddress)
  })
})

/**
 * Fail addressHex.
 */
test('fail addressHex', t => {
  t.throws(() => {
    arg.addressHex('test')
  })
})

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
