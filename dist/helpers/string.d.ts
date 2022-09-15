import { z } from 'zod';
import { PipeFunction } from 'string-template-parser';
declare const varsObj: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare type varsType = z.infer<typeof varsObj>;
/**
 * Trim first & last forward slashes
 * @param stringValue the string to trim
 * @returns string
 */
declare const trimSlashes: (stringValue: string) => string;
/**
 * Parse stub template content
 * @param _content content of the template
 * @param _vars variables to parse
 * @param _pipes function pipes to modify vars
 * @returns string
 */
declare const parseStub: (_content: string, _vars: varsType, _pipes: {
    [pipe: string]: PipeFunction;
}) => Promise<string>;
export { trimSlashes, parseStub };
