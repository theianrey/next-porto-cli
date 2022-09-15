import { z } from 'zod';
declare const WriteParamsObj: z.ZodObject<{
    filename: z.ZodString;
    path: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    filename: string;
    content: string;
}, {
    path: string;
    filename: string;
    content: string;
}>;
export declare type WriteParamsType = z.infer<typeof WriteParamsObj>;
/**
 * Write a file base on params
 * @param _ parameters required for writing the file to a designated path
 * @returns void
 */
declare const write: (_: WriteParamsType) => Promise<void>;
/**
 * Read the file & return the content
 * @param _path file path
 * @returns promise
 */
declare const readFile: (_path: string) => Promise<string>;
/**
 * Check if file/directory exists
 * @param _path file path
 * @returns boolead
 */
declare const fileExist: (_path: string) => boolean;
/**
 * Delete a directory that is not empty, same command to `rm -rf`
 * @param _path path to delete
 * @returns void
 */
declare const forceDelete: (_path: string) => void;
export { write, fileExist, readFile, forceDelete };
