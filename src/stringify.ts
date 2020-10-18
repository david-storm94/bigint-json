import { cloneDeep } from 'lodash';

/**
 * Stringifies object with bigints just like JSON.stringify,
 * but converts bigints to string and appends n
 *
 * @example
 * stringify({key: 1234n})
 * // returns '{"key":"1234n"}'
 *
 * @param {object} input
 *
 * @param {object} replacer — An array of strings and numbers that acts as a approved list for selecting the object properties that will be stringified.
 *
 * @return {string} Returns stringified JSON
 */
function stringify(
  input: any,
  replacer?: (this: any, key: string, value: any) => any
): string {
  if (!input) {
    throw new Error('Invalid input');
  }

  if (typeof input !== 'object') {
    throw new Error('TypeError: Do not know to stringify a ' + typeof input);
  }

  let object = cloneDeep(input);

  object = bigintToString(object);

  return JSON.stringify(object, replacer);
}

/**
 * @param {object} o
 * @return {object}
 */
function bigintToString(o: { [x: string]: any }) {
  Object.keys(o).forEach((k) => {
    if (o[k] != null && typeof o[k] === 'object') {
      return bigintToString(o[k]);
    }
    if (typeof o[k] === 'bigint') {
      o[k] = `${o[k]}n`;
    }
  });
  return o;
}

export default stringify;
