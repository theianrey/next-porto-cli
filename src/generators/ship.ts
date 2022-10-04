/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable no-prototype-builtins */
import 'module-alias/register'
import {CliUx} from '@oclif/core'
import type {ShipPathsType} from '../helpers/path'
import * as filesystem from '../helpers/filesystem'

// * Objects
// * Types

// * context of parent this
const _this: any = this

// * files to generate in a container
const mapFilesContent = {
  hooks: '.gitkeep',
  config: '.gitkeep',
  styles: '.gitkeep',
  layouts: '.gitkeep',
  helpers: '.gitkeep',
  components: '.gitkeep',
}

/**
 * Create files from paths
 * @param _paths object containing the file paths to scaffold
 * @returns void
 */
const generateFromPaths = async (_paths: ShipPathsType): Promise<void> => {
  // * reference to be used later
  _this.refContainersPaths = _paths

  // *
  // CliUx.ux.action.start('Creating files...')
  try {
    // * loop through the scaffold paths & create necessary files & directories
    for (const [key, path] of Object.entries(_paths)) {
      // *
      const lowerKey = key.toLowerCase()

      // * map file contents
      for (const [pathKey] of Object.entries(mapFilesContent)) {
        if (lowerKey.includes(pathKey)) {
          const callFuncString = `${pathKey}Generator`

          // * run generator file
          runGenerator(callFuncString, path)
        }
      }
    }
  } catch (error) {
    CliUx.ux.action.stop('Error occured.')
    console.log({error})
  }

  // *
  // CliUx.ux.action.stop('Done.')
}

/**
 * Run file generator function base on the ff. parameters
 * @param _generator generator name function
 * @param _path path to generate the file
 * @returns void
 */
const runGenerator = async (
  _generator: string,
  _path: string,
): Promise<void> => {
  // * check if the function exists
  if (
    _this.hasOwnProperty(_generator) &&
    _this[_generator] instanceof Function
  ) {
    // * run generator
    await _this[_generator](_path)
  }
}

// *
const hooksGenerator = async (_path: string): Promise<void> => {
  try {
    // console.log('Generating hooks directory...')
    await filesystem.write({
      filename: mapFilesContent.hooks,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
  }
}

// *
const configGenerator = async (_path: string): Promise<void> => {
  try {
    // console.log('Generating config directory...')
    await filesystem.write({
      filename: mapFilesContent.config,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
  }
}

// *
const layoutsGenerator = async (_path: string): Promise<void> => {
  try {
    // console.log('Generating layouts directory...')
    await filesystem.write({
      filename: mapFilesContent.layouts,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
  }
}

// *
const stylesGenerator = async (_path: string): Promise<void> => {
  try {
    // console.log('Generating styles directory...')
    await filesystem.write({
      filename: mapFilesContent.styles,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
  }
}

// *
const helpersGenerator = async (_path: string): Promise<void> => {
  try {
    // console.log('Generating helpers directory...')
    await filesystem.write({
      filename: mapFilesContent.helpers,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
  }
}

// *
const componentsGenerator = async (_path: string): Promise<void> => {
  try {
    // console.log('Generating components directory...')
    await filesystem.write({
      filename: mapFilesContent.components,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
  }
}

// *
export {
  generateFromPaths,
  hooksGenerator,
  configGenerator,
  layoutsGenerator,
  stylesGenerator,
  helpersGenerator,
  componentsGenerator,
}
