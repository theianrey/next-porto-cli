/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable node/no-extraneous-import */
import 'module-alias/register'
import {z} from 'zod'
import * as _ from 'lodash'
import * as path from 'node:path'
import {filesystem} from '@helpers/index'

// * context of parent this
const _this: any = this

// *
const DEFAULT_CONFIG = {
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@Containers/*': ['./src/Containers/*'],
      '@Ship/*': ['./src/Ship/*'],
    },
  },
  include: ['./pages', './src/**/*'],
  exclude: ['node_modules'],
}

// * Object
const configObj = z.object({
  compilerOptions: z.any(),
  include: z.array(z.string()),
  exclude: z.array(z.string()),
})

// * Types
export type ConfigType = z.infer<typeof configObj>

/**
 * check for existing config json file on the project root
 * @param _projectPath path of the project directory
 * @returns boolean
 */
const checkConfigFile = async (_projectPath: string): Promise<string> => {
  let configFunc = ''
  const configs: string[] = ['jsconfig.json', 'tsconfig.json']

  // *
  for (const config of configs) {
    // *
    if (filesystem.fileExist(path.resolve(_projectPath, config))) {
      configFunc =
        'generate' + _.capitalize(_.split(config, 'config')[0]) + 'Config'
      break
    }
  }

  return configFunc === '' ? 'generateJsConfig' : configFunc
}

/**
 * Run config function for generating config file
 * @param _projectPath path of the project directory
 * @return void
 */
const generateConfig = async (_projectPath: string): Promise<void> => {
  const configFunc: string = await checkConfigFile(_projectPath)

  if (
    _this.hasOwnProperty(configFunc) &&
    _this[configFunc] instanceof Function
  ) {
    await _this[configFunc](_projectPath)
  }
}

/**
 * Generate jsconfig.json config file
 * @param _projectPath path to the project directory
 * @return void
 */
const generateJsConfig = async (_projectPath: string): Promise<void> => {
  /**
   ** Usually jsconfig does not exist in a newly create project
   ** so we will need to check the config file exists.
   */
  const configFileExist = filesystem.fileExist(
    path.resolve(_projectPath, 'jsconfig.json'),
  )

  // *
  if (configFileExist) {
    // *
    const parsedConfigFile = await parseConfigFile(
      path.resolve(_projectPath, 'jsconfig.json'),
    )

    // *
    if (parsedConfigFile !== undefined) {
      // * merge data from default config
      parsedConfigFile.compilerOptions = {
        ...DEFAULT_CONFIG.compilerOptions,
        ...parsedConfigFile.compilerOptions,
      }

      // *
      parsedConfigFile.include = [
        ...new Set([...parsedConfigFile.include, ...DEFAULT_CONFIG.include]),
      ]
      // *
      parsedConfigFile.exclude = [
        ...new Set([...parsedConfigFile.exclude, ...DEFAULT_CONFIG.exclude]),
      ]
    }

    // * create file
    await filesystem.write({
      filename: 'jsconfig.json',
      path: path.resolve(_projectPath),
      content: JSON.stringify(parsedConfigFile, null, 2),
    })
  } else {
    // * create new config file
    await filesystem.write({
      filename: 'jsconfig.json',
      path: path.resolve(_projectPath),
      content: JSON.stringify(DEFAULT_CONFIG, null, 2),
    })
  }
}

/**
 * Generate tsconfig.json config file
 * @param _projectPath path to the project directory
 * @return void
 */
const generateTsConfig = async (_projectPath: string): Promise<void> => {
  // *
  const configFileExist = filesystem.fileExist(
    path.resolve(_projectPath, 'tsconfig.json'),
  )

  // *
  if (configFileExist) {
    // *
    const parsedConfigFile = await parseConfigFile(
      path.resolve(_projectPath, 'tsconfig.json'),
    )

    // *
    if (parsedConfigFile !== undefined) {
      // * merge data from default config
      parsedConfigFile.compilerOptions = {
        ...DEFAULT_CONFIG.compilerOptions,
        ...parsedConfigFile.compilerOptions,
      }

      // *
      parsedConfigFile.include = [
        ...new Set([...parsedConfigFile.include, ...DEFAULT_CONFIG.include]),
      ]
      // *
      parsedConfigFile.exclude = [
        ...new Set([...parsedConfigFile.exclude, ...DEFAULT_CONFIG.exclude]),
      ]
    }

    // * create file
    await filesystem.write({
      filename: 'tsconfig.json',
      path: path.resolve(_projectPath),
      content: JSON.stringify(parsedConfigFile, null, 2),
    })
  } else {
    // * create new config file
    await filesystem.write({
      filename: 'tsconfig.json',
      path: path.resolve(_projectPath),
      content: JSON.stringify(DEFAULT_CONFIG, null, 2),
    })
  }
}

/**
 * Parse a json config file content into json object
 * @param _pathToJsonFile path to json config file
 * @returns any | undefined
 */
const parseConfigFile = async (
  _pathToJsonFile: string,
): Promise<ConfigType | undefined> => {
  const content = await filesystem.readFile(_pathToJsonFile)
  return JSON.parse(content)
}

// *
export {
  checkConfigFile,
  generateConfig,
  generateJsConfig,
  generateTsConfig,
  parseConfigFile,
}
