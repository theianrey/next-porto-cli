"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceDelete = exports.readFile = exports.fileExist = exports.write = void 0;
const zod_1 = require("zod");
const path = require("node:path");
const node_fs_1 = require("node:fs");
// * Objects
const WriteParamsObj = zod_1.z.object({
    filename: zod_1.z.string(),
    path: zod_1.z.string(),
    content: zod_1.z.string(),
});
/**
 * Write a file base on params
 * @param _ parameters required for writing the file to a designated path
 * @returns void
 */
const write = async (_) => {
    try {
        if (!fileExist(_.path)) {
            // * try to create directory if it does not exist
            await node_fs_1.promises.mkdir(_.path, { recursive: true, mode: '0755' });
        }
        // * create file
        return await node_fs_1.promises.writeFile(path.join(_.path, _.filename), _.content, {
            mode: '0755',
        });
    }
    catch (error) {
        console.log({ error });
        throw new Error(`Unable to write file ${_.filename} to ${_.path}`);
    }
};
exports.write = write;
/**
 * Read the file & return the content
 * @param _path file path
 * @returns promise
 */
const readFile = async (_path) => {
    return node_fs_1.promises.readFile(_path, { encoding: 'utf8' });
};
exports.readFile = readFile;
/**
 * Check if file/directory exists
 * @param _path file path
 * @returns boolead
 */
const fileExist = (_path) => {
    return (0, node_fs_1.existsSync)(_path);
};
exports.fileExist = fileExist;
/**
 * Delete a directory that is not empty, same command to `rm -rf`
 * @param _path path to delete
 * @returns void
 */
const forceDelete = (_path) => {
    (0, node_fs_1.rmSync)(_path, { recursive: true, force: true });
};
exports.forceDelete = forceDelete;
