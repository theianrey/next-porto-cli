import {z} from 'zod'
import * as path from 'node:path'
import {promises, existsSync, rmSync} from 'node:fs'

// * Objects
const WriteParamsObj = z.object({
  filename: z.string(),
  path: z.string(),
  content: z.string(),
})

// * types
export type WriteParamsType = z.infer<typeof WriteParamsObj>
/**
 * Write a file base on params
 * @param _ parameters required for writing the file to a designated path
 * @returns void
 */
const write = async (_: WriteParamsType): Promise<void> => {
  try {
    if (!fileExist(_.path)) {
      // * try to create directory if it does not exist
      await promises.mkdir(_.path, {recursive: true, mode: '0755'})
    }

    // * create file
    return await promises.writeFile(path.join(_.path, _.filename), _.content, {
      mode: '0755',
    })
  } catch (error) {
    console.log({error})
    throw new Error(`Unable to write file ${_.filename} to ${_.path}`)
  }
}

/**
 * Read the file & return the content
 * @param _path file path
 * @returns promise
 */
const readFile = async (_path: string): Promise<string> => {
  return promises.readFile(_path, {encoding: 'utf8'})
}

/**
 * Check if file/directory exists
 * @param _path file path
 * @returns boolead
 */
const fileExist = (_path: string): boolean => {
  return existsSync(_path)
}

/**
 * Delete a directory that is not empty, same command to `rm -rf`
 * @param _path path to delete
 * @returns void
 */
const forceDelete = (_path: string): void => {
  rmSync(_path, {recursive: true, force: true})
}

export {write, fileExist, readFile, forceDelete}
