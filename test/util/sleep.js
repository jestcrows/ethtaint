// Import AVA
import test from 'ava'

// Imports
import sleep from '../../src/util/sleep'

/**
 * Sleep 10 milliseconds.
 */
test('sleep 10 milliseconds', async t => {
  await t.notThrows(async () => {
    await sleep(10)
  })
})

/**
 * Sleep default time.
 */
test('sleep default time', async t => {
  await t.notThrows(async () => {
    await sleep()
  })
})

/**
 * Time must be number.
 */
test('time must be number', async t => {
  const prom = sleep('test')
  await t.throws(prom)
})

/**
 * Time must be integer.
 */
test('time must be integer', async t => {
  const prom = sleep(7.4)
  await t.throws(prom)
})
