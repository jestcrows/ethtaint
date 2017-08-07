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
 */
function sleep (time = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

// Expose
module.exports = sleep
