// Import AVA
import test from 'ava'

// Imports
const userAgent = require('../../src/net/useragent')

/**
 * Received string.
 */
test('string', t => {
  t.true(typeof userAgent === 'string')
})
