// Import AVA
import test from 'ava'

// Imports
import request from '../../src/net/request'

/**
 * Imported a function.
 */
test('imported function', t => {
  t.true(typeof request === 'function')
})

/**
 * Has get method.
 */
test('get method', t => {
  t.true(typeof request.get === 'function')
})

/**
 * Has defaults method.
 */
test('defaults method', t => {
  t.true(typeof request.defaults === 'function')
})
