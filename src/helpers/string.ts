import {z} from 'zod'
import {
  parseStringTemplateGenerator,
  evaluateParsedString,
  PipeFunction,
} from 'string-template-parser'
import * as _ from 'lodash'

// * objects
const varsObj = z.object({})

// * types
export type varsType = z.infer<typeof varsObj>

/**
 * Trim first & last forward slashes
 * @param stringValue the string to trim
 * @returns string
 */
const trimSlashes = (stringValue: string): string => {
  return stringValue.replace(/^\/|\/$/g, '')
}

/**
 * Parse stub template content
 * @param _content content of the template
 * @param _vars variables to parse
 * @param _pipes function pipes to modify vars
 * @returns string
 */
const parseStub = async (
  _content: string,
  _vars: varsType,
  _pipes: {[pipe: string]: PipeFunction}
): Promise<string> => {
  // * cofig parser
  const parser = parseStringTemplateGenerator({
    VARIABLE_START: /^{{\s*/,
    VARIABLE_END: /^\s*}}/,
  })

  return evaluateParsedString(parser(_content), _vars, _pipes)
}

export {trimSlashes, parseStub}
