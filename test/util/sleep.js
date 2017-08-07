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
