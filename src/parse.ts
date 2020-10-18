/**
 ** Parses object with bigints just like JSON.parse,
 *  but converts strings of numbers ending with n into bigints
 *
 * @example
 * parse('{"key":"1234n"}')
 * // returns { key: 1234n }
 *
 * @returns {Object} Returns parsed object with bigints
 *
 * @param {string} input — A valid JSON string.
 *
 * @param {object} reviver - A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is.
 */
function parse(
  input: string,
  reviver: ((this: any, key: string, value: any) => any) | undefined = undefined
) {
  if (!input) {
    throw new Error('Invalid input');
  }

  if (typeof input !== 'string') {
    throw new Error('TypeError: Do not know to parse a ' + typeof input);
  }

  const parsed = JSON.parse(input, reviver);

  return stringToBigint(parsed);
}

/**
 *
 * @param {object} o
 * @return {object}
 */
function stringToBigint(o: { [x: string]: string | any }) {
  Object.keys(o).forEach((k) => {
    if (o[k] != null && typeof o[k] === 'object') {
      return stringToBigint(o[k]);
    }

    if (typeof o[k] === 'string') {
      if (/^\d+n$/.test(o[k])) {
        o[k] = BigInt(o[k].substring(0, o[k].length - 1));
      }
    }
  });
  return o;
}

export default parse;
