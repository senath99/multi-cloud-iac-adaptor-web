/*
 * Project: Dynamedics Portal Web
 * Created Date: Monday May 16th 2022
 * Author: Nalinda Wijayagunawardhane
 * -----
 * Last Modified: Monday May 16th 2022 9:03:17 pm
 * Modified By: Nalinda Wijayagunawardhane at <nwijayagunawardhane@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 * 2022-07-23	NRB	Added shortening of number removing the decimal points.
 */

import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  return numeral(number / 100).format('0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fDecimal(number) {
  return numeral(number).format('0,0.[00]');
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fShortenNumberRounded(number) {
  return numeral(number).format('0a');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
