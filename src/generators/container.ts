/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable node/no-extraneous-import */
/* eslint-disable no-prototype-builtins */
/* eslint-disable unicorn/prefer-module */
import 'module-alias/register'
import * as _ from 'lodash'
import * as path from 'node:path'
import {CliUx} from '@oclif/core'
import {getPath, PKG_ROOT} from '@helpers/path'
import * as str from '@helpers/string'
import {checkConfigFile} from './config'
import * as filesystem from '@helpers/filesystem'
import type {ContainerPathsType, PagePathType} from '@helpers/path'

// * Objects
// * Types

// * context of parent this
const _this: any = this

// * files to generate in a container
const mapFilesContent = {
  appcontainers: '.gitkeep',
  assets: '.gitkeep',
  configs: '-config.{{ext}}s',
  components: '.gitkeep',
  helpers: '.gitkeep',
  hooks: '.gitkeep',
  actions: '.gitkeep',
  styles: '{{container}}.css',
  pages: 'index.{{ext}}sx',
  api: 'index.{{ext}}s',
}

const checkExt = async (): Promise<string> => {
  const configFile = await checkConfigFile(path.resolve(getPath('src')))

  return configFile.toLowerCase().includes('jsonconfig') ? 'j' : 't'
}

/**
 * Create files from paths
 * @param _paths object containing the file paths to scaffold
 * @returns void
 */
const generateFromPaths = async (
  _paths: ContainerPathsType | PagePathType,
): Promise<void> => {
  // * reference to be used later
  _this.refContainersPaths = _paths

  // *
  CliUx.ux.action.start('Creating files...')
  try {
    // * loop through the scaffold paths & create necessary files & directories
    for (const [key, path] of Object.entries(_paths)) {
      // *
      const lowerKey = key.toLowerCase()

      // * map file contents
      for (const [pathKey] of Object.entries(mapFilesContent)) {
        if (lowerKey.includes(pathKey)) {
          if (pathKey === 'pages' && lowerKey === 'pagesapipath') {
            continue
          }

          const callFuncString =
            pathKey === 'api' ? 'pagesApiGenerator' : `${pathKey}Generator`
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

/**
 * Read stub template file
 * @param _stubPath path to template file
 * @returns string
 */
const getStubContent = async (_stubPath: string): Promise<string> => {
  return filesystem.readFile(_stubPath)
}

const appcontainersGenerator = async (_path: string): Promise<void> => {
  try {
    await filesystem.write({
      filename: mapFilesContent.appcontainers,
      path: _path,
      content: '',
    })
  } catch (error) {
    console.log({error})
    throw new Error('Unable to create app containers directory')
  }
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
        _.toLower(_this.refContainersPaths.container) +
        mapFilesContent.configs.replace('{{ext}}', await checkExt()),
      path: _path,
      content: await getStubContent(
        path.resolve(PKG_ROOT, 'stubs/config/default.stub'),
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
        _this.refContainersPaths.container.toLowerCase(),
      ),
      path: _path,
      content: await getStubContent(
        path.resolve(PKG_ROOT, 'stubs/styles/default.stub'),
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
        path.resolve(PKG_ROOT, 'stubs/pages/container.stub'),
      ),
      {pageClass: _path.slice(_path.lastIndexOf('/')).replace('/', '')},
      {capitalize: (val: string) => _.capitalize(val)},
    )

    // * bootstrap stub content
    const bootstrapStubContent = await str.parseStub(
      await getStubContent(
        path.resolve(PKG_ROOT, 'stubs/pages/bootstrap.stub'),
      ),
      {
        pagePath: _path.split('pages/')[1],
        pageClass: _path.slice(_path.lastIndexOf('/')).replace('/', ''),
        sectionName: _this.refContainersPaths.section,
        containerName: _this.refContainersPaths.container,
      },
      {capitalize: (val: string) => _.capitalize(val)},
    )

    // * create file for container
    await filesystem.write({
      filename: mapFilesContent.pages.replace('{{ext}}', await checkExt()),
      path: _path,
      content: containerStubContent,
    })

    // * create file for bootstrap
    await filesystem.write({
      filename: mapFilesContent.pages.replace('{{ext}}', await checkExt()),
      path: path.join(
        path.resolve(_path.slice(0, _path.lastIndexOf('src')), 'pages'),
        _path.split('pages/')[1],
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
    // * bootstrap stub content
    const bootstrapStubContent = await str.parseStub(
      await getStubContent(
        path.resolve(
          PKG_ROOT,
          (await checkExt()) === 't'
            ? 'stubs/pages/api/ts/bootstrap.stub'
            : 'stubs/pages/api/bootstrap.stub',
        ),
      ),
      {
        apiClass: _path.slice(_path.lastIndexOf('/')).replace('/', ''),
        apiPath: _path.split('pages/api/')[1],
        sectionName: _this.refContainersPaths.section,
        containerName: _this.refContainersPaths.container,
      },
      {capitalize: (val: string) => _.capitalize(val)},
    )

    // * container stub content
    const containerStubContent = await str.parseStub(
      await getStubContent(
        path.resolve(
          PKG_ROOT,
          (await checkExt()) === 't'
            ? 'stubs/pages/api/ts/container.stub'
            : 'stubs/pages/api/container.stub',
        ),
      ),
      {apiClass: _path.slice(_path.lastIndexOf('/')).replace('/', '')},
      {capitalize: (val: string) => _.capitalize(val)},
    )

    // * create file for container
    await filesystem.write({
      filename: mapFilesContent.api.replace('{{ext}}', await checkExt()),
      path: _path,
      content: containerStubContent,
    })

    // * create file for bootstrap
    await filesystem.write({
      filename: mapFilesContent.api.replace('{{ext}}', await checkExt()),
      path: path.join(
        path.resolve(_path.slice(0, _path.lastIndexOf('src')), 'pages/api'),
        _path.split('pages/api/')[1],
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
  appcontainersGenerator,
}
