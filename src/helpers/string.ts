/**
 * Trim first & last forward slashes
 * @param stringValue the string to trim
 * @returns string
 */
const trimSlashes = (stringValue: string): string => {
  return stringValue.replace(/^\/|\/$/g, '')
}

export {trimSlashes}
