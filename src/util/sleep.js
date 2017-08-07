/**
 * @file Asynchronous sleep.
 * @module util/sleep
 */

'use strict'

/**
 * Asynchronous sleep.
 * @async
 * @static
 * @param {number} [time=0] - Time in milliseconds.
 * @return {undefined} After specified time.
 * @throws {Error} If time is not an integer.
 */
function sleep (time = 0) {
  return new Promise(resolve => {
    // Validate arguments
    arg.integer(time)

    setTimeout(resolve, time)
  })
}

// Expose
module.exports = sleep

// Circular imports
const arg = require('./arg')
