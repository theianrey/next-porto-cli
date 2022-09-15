import 'module-alias/register'
import {z} from 'zod'
import * as _ from 'lodash'
import * as str from './string'
import * as path from 'node:path'
import {CliUx} from '@oclif/core'
import type {ScaffoldType} from './path'
import * as filesystem from './filesystem'

// * Objects
// * Types

// * context of parent this
const _this: any = this

// * files to generate in a container
const mapFilesContent = {
  assets: '.gitkeep',
  configs: '-config.js',
  components: '.gitkeep',
  helpers: '.gitkeep',
  hooks: '.gitkeep',
  actions: '.gitkeep',
  styles: '{{container}}.css',
  pages: 'index.js',
  api: '{{container}}.js',
}

/**
 * Create files from paths
 * @param _scaffoldPaths object containing the file paths to scaffold
 * @returns void
 */
const generateFromPaths = async (
  _scaffoldPaths: ScaffoldType
): Promise<void> => {
  // * reference to be used later
  _this.refScaffoldPaths = _scaffoldPaths

  // *
  CliUx.ux.action.start('Creating files...')
  try {
    // * loop through the scaffold paths & create necessary files & directories
    for (const [key, path] of Object.entries(_scaffoldPaths)) {
      // *
      const lowerKey = key.toLowerCase()

      // * map file contents
      for (const [pathKey, pathFile] of Object.entries(mapFilesContent)) {
        if (lowerKey.includes(pathKey)) {
          if (pathKey === 'pages' && lowerKey === 'pagesapipath') {
            continue
          }

          const callFuncString =
            pathKey === 'api' ? 'pagesApiGenerator' : `${pathKey}Generator`
          // console.log({callFuncString})
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
  CliUx.ux.action.stop('Done.')
}

/**
 * Run file generator function base on the ff. parameters
 * @param _generator generator name function
 * @param _path path to generate the file
 * @returns void
 */
const runGenerator = async (
  _generator: string,
  _path: string
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

/**
 * Read stub template file
 * @param _stubPath path to template file
 * @returns void
 */
const getStubContent = async (_stubPath: string): Promise<string> => {
  return filesystem.readFile(_stubPath)
}

/**
 * Generate assets directory
 * @param _path path to generate the file
 * @returns void
 */
const assetsGenerator = async (_path: string): Promise<void> => {
  // * no stub content
  // * create file
  try {
    console.log('Generating assets directory...')
    await filesystem.write({
      filename: mapFilesContent.assets,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create assets directory')
  }
}

/**
 * Generate configs directory
 * @param _path path to generate the file
 * @returns void
 */
const configsGenerator = async (_path: string): Promise<void> => {
  // * no stub content
  // * create file
  try {
    console.log('Generating configs directory...')
    await filesystem.write({
      filename:
        _.toLower(_this.refScaffoldPaths.container) + mapFilesContent.configs,
      path: _path,
      content: await getStubContent(
        path.resolve(__dirname, '../stubs/config/default.stub')
      ),
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create configs directory')
  }
}

/**
 * Generate components directory
 * @param _path path to generate the file
 * @returns void
 */
const componentsGenerator = async (_path: string): Promise<void> => {
  // * no stub content
  // * create file
  try {
    console.log('Generating components directory...')
    await filesystem.write({
      filename: mapFilesContent.components,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create components directory')
  }
}

/**
 * Generate helpers directory
 * @param _path path to generate the file
 * @returns void
 */
const helpersGenerator = async (_path: string): Promise<void> => {
  // * no stub content
  // * create file
  try {
    console.log('Generating helpers directory...')
    await filesystem.write({
      filename: mapFilesContent.helpers,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create helpers directory')
  }
}

/**
 * Generate hooks directory
 * @param _path path to generate the file
 * @returns void
 */
const hooksGenerator = async (_path: string): Promise<void> => {
  // * no stub content
  // * create file
  try {
    console.log('Generating hooks directory...')
    await filesystem.write({
      filename: mapFilesContent.hooks,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create hooks directory')
  }
}

/**
 * Generate actions directory
 * @param _path path to generate the file
 * @returns void
 */
const actionsGenerator = async (_path: string): Promise<void> => {
  // * no stub content
  // * create file
  try {
    console.log('Generating actions directory...')
    await filesystem.write({
      filename: mapFilesContent.actions,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create hooks directory')
  }
}

/**
 * Generate styles directory
 * @param _path path to generate the file
 * @returns void
 */
const stylesGenerator = async (_path: string): Promise<void> => {
  // * no stub content
  // * create file
  try {
    console.log('Generating styles directory...')
    await filesystem.write({
      filename: mapFilesContent.styles.replace(
        '{{container}}',
        _this.refScaffoldPaths.container.toLowerCase()
      ),
      path: _path,
      content: await getStubContent(
        path.resolve(__dirname, '../stubs/styles/default.stub')
      ),
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create hooks directory')
  }
}

/**
 * Generate pages directory for container & bootstrap it to root pages directory
 * @param _path path to generate the file
 * @returns void
 */
const pagesGenerator = async (_path: string): Promise<void> => {
  try {
    console.log('Generating pages directory...')
    // * container stub content
    const containerStubContent = await str.parseStub(
      await getStubContent(
        path.resolve(__dirname, '../stubs/pages/container.stub')
      ),
      {containerName: _this.refScaffoldPaths.container},
      {}
    )

    // * bootstrap stub content
    const bootstrapStubContent = await str.parseStub(
      await getStubContent(
        path.resolve(__dirname, '../stubs/pages/bootstrap.stub')
      ),
      {containerName: _this.refScaffoldPaths.container},
      {toLower: (val: string) => _.toLower(val)}
    )

    // * create file for container
    await filesystem.write({
      filename: mapFilesContent.pages,
      path: path.resolve(_path, _this.refScaffoldPaths.container.toLowerCase()),
      content: containerStubContent,
    })

    // * create file for bootstrap
    await filesystem.write({
      filename: mapFilesContent.pages,
      path: path.join(
        path.resolve(process.cwd(), 'pages'),
        _this.refScaffoldPaths.container.toLowerCase()
      ),
      content: bootstrapStubContent,
    })
  } catch (error) {
    console.log({error})
  }
}

/**
 * Generate pages api directory
 * @param _path path to generate the file
 * @returns void
 */
const pagesApiGenerator = async (_path: string): Promise<void> => {
  try {
    console.log('Generating pages api directory...')
    // * container stub content
    const bootstrapStubContent = await str.parseStub(
      await getStubContent(
        path.resolve(__dirname, '../stubs/pages/api/bootstrap.stub')
      ),
      {containerName: _this.refScaffoldPaths.container},
      {toLower: (val: string) => _.toLower(val)}
    )

    // * container stub content
    const containerStubContent = await str.parseStub(
      await getStubContent(
        path.resolve(__dirname, '../stubs/pages/api/container.stub')
      ),
      {containerName: _this.refScaffoldPaths.container},
      {}
    )

    // * create file for container
    await filesystem.write({
      filename: mapFilesContent.api.replace(
        '{{container}}',
        _this.refScaffoldPaths.container.toLowerCase()
      ),
      path: path.resolve(_path, _this.refScaffoldPaths.container.toLowerCase()),
      content: containerStubContent,
    })

    // * create file for bootstrap
    await filesystem.write({
      filename: mapFilesContent.api.replace(
        '{{container}}',
        _this.refScaffoldPaths.container.toLowerCase()
      ),
      path: path.join(
        path.resolve(process.cwd(), 'pages/api'),
        _this.refScaffoldPaths.container.toLowerCase()
      ),
      content: bootstrapStubContent,
    })
  } catch (error) {
    console.log({error})
  }
}

export {
  generateFromPaths,
  runGenerator,
  assetsGenerator,
  configsGenerator,
  componentsGenerator,
  helpersGenerator,
  hooksGenerator,
  actionsGenerator,
  stylesGenerator,
  pagesGenerator,
  pagesApiGenerator,
}
