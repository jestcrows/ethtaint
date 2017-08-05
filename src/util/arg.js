/**
 * @file Argument validation procedures.
 * @package
 */

'use strict'

// Imports
const type = {
  Address: require('../primitives/address'),
  Taint: require('../primitives/taint')
}

/**
 * Confirm argument is Address.
 * @param {Address|*} arg - Argument.
 * @return {undefined}
 * @throws {Error} - If arg is not an Address.
 */
exports.Address = function Address (arg) {
  if (!(arg instanceof type.Address)) {
    throw new Error('Argument must be Address')
  }
}

/**
 * Confirm argument is Taint.
 * @param {Taint|*} arg - Argument.
 * @return {undefined}
 * @throws {Error} - If arg is not a Taint.
 */
exports.Taint = function Taint (arg) {
  if (!(arg instanceof type.Taint)) {
    throw new Error('Argument must be Taint')
  }
}
