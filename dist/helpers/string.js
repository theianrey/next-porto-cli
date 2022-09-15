"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStub = exports.trimSlashes = void 0;
const zod_1 = require("zod");
const string_template_parser_1 = require("string-template-parser");
// * objects
const varsObj = zod_1.z.object({});
/**
 * Trim first & last forward slashes
 * @param stringValue the string to trim
 * @returns string
 */
const trimSlashes = (stringValue) => {
    return stringValue.replace(/^\/|\/$/g, '');
};
exports.trimSlashes = trimSlashes;
/**
 * Parse stub template content
 * @param _content content of the template
 * @param _vars variables to parse
 * @param _pipes function pipes to modify vars
 * @returns string
 */
const parseStub = async (_content, _vars, _pipes) => {
    // * cofig parser
    const parser = (0, string_template_parser_1.parseStringTemplateGenerator)({
        VARIABLE_START: /^{{\s*/,
        VARIABLE_END: /^\s*}}/,
    });
    return (0, string_template_parser_1.evaluateParsedString)(parser(_content), _vars, _pipes);
};
exports.parseStub = parseStub;
