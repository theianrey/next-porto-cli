/* eslint-disable node/no-extraneous-import */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable no-prototype-builtins */
import {z} from 'zod'
import * as path from 'node:path'
import * as str from './string'
import * as _ from 'lodash'

/**
 * ----------------------------------------------------------------------
 */
const distPath = path.dirname(__filename as string)
export const PKG_ROOT = path.join(distPath, '../')

// * context of parent this
const _this: any = this

// * scaffold containers paths object definition
const containerPathsObj = z.object({
  section: z.string(),
  container: z.string(),
  // * paths
  srcPath: z.string(),
  appContainersPath: z.string().optional(),
  sectionPath: z.string(),
  containerPath: z.string(),
  pagesPath: z.string(),
  pagesApiPath: z.string(),
  assetsPath: z.string(),
  configsPath: z.string(),
  componentsPath: z.string(),
  helpersPath: z.string(),
  hooksPath: z.string(),
  actionsPath: z.string(),
  stylesPath: z.string(),
})
// * get type of scaffold object
export type ContainerPathsType = z.infer<typeof containerPathsObj>

const pagePathObj = containerPathsObj
  .partial()
  .pick({section: true, container: true, pagesPath: true, pagesApiPath: true})
// *
export type PagePathType = z.infer<typeof pagePathObj>

// * scaffold ship paths object definition
const shipPatshObj = z.object({
  hooks: z.string(),
  config: z.string(),
  layouts: z.string(),
  styles: z.string(),
  helpers: z.string(),
  components: z.string(),
})
// *
export type ShipPathsType = z.infer<typeof shipPatshObj>

// * path object
const PathObj = z.object({
  path: z.string(),
  section: z.string().optional(),
  container: z.string().optional(),
})
// * get type of path object
export type PathType = z.infer<typeof PathObj>

// * extract params object from path object
const ParamsObj = PathObj.pick({section: true, container: true})
// * get type of params object
export type ParamsType = z.infer<typeof ParamsObj>

// * -----------------------------------------------------------------------------
/**
 * Scaffold the container paths
 *
 * @param section section name
 * @param container container name
 * @returns ContainerPathsType
 */
const containerScafffolding = (
  section: string,
  container: string,
): ContainerPathsType => {
  return {
    section,
    container,
    srcPath: getPath('src'),
    sectionPath: getPath('section', {section}),
    containerPath: getPath('container', {section, container}),
    assetsPath: getPath('assets', {section, container}),
    configsPath: getPath('configs', {section, container}),
    componentsPath: getPath('components', {section, container}),
    helpersPath: getPath('helpers', {section, container}),
    hooksPath: getPath('hooks', {section, container}),
    actionsPath: getPath('actions', {section, container}),
    stylesPath: getPath('styles', {section, container}),
    pagesPath: path.resolve(
      getPath('pages', {section, container}),
      container.toLowerCase(),
    ),
    pagesApiPath: path.resolve(
      getPath('api', {section, container}),
      container.toLowerCase(),
    ),
  }
}

/**
 * Scaffold the ship paths
 * @param _projectDir string value for project directory [optional]
 * @returns ShipPathsType
 */
const shipScaffolding = (_projectDir?: string): ShipPathsType => {
  return {
    hooks: path.resolve(getShipPath(_projectDir), 'Hooks'),
    config: path.resolve(getShipPath(_projectDir), 'Config'),
    layouts: path.resolve(getShipPath(_projectDir), 'Layouts'),
    styles: path.resolve(getShipPath(_projectDir), 'Styles'),
    helpers: path.resolve(getShipPath(_projectDir), 'Helpers'),
    components: path.resolve(getShipPath(_projectDir), 'Components'),
  }
}

/**
 * Get the path base on the section & container
 * @param _funcName function path short name
 * @param _params optional parameter for {section, container}
 * @returns string
 */
const getPath = (_funcName: string, _params?: ParamsType): string => {
  // * format the function path string to proper case
  const capitalizeFunc = _.capitalize(_funcName)

  // * for path short names
  const callFuncString = `get${capitalizeFunc}Path`

  if (
    !_this.hasOwnProperty(callFuncString) &&
    !(_this[callFuncString] instanceof Function)
  ) {
    // * empty string
    throw new Error(`Invalid function call "${callFuncString}".`)
  }

  // * if container params exists
  if (_params) {
    // * destruct optional params
    const {section, container} = _params

    // * return path with params
    return ['', null, undefined].includes(container)
      ? _this[callFuncString](section)
      : _this[callFuncString](section, container)
  }

  // * return function without params
  return _this[callFuncString]()
}

/**
 * Get base application path, includes relative path if parameter exists
 * @param _path relative path from the root directory
 * @returns string
 */
const getBasePath = (_path?: string): string => {
  return _path
    ? path.join(process.cwd(), '/', str.trimSlashes(_path))
    : process.cwd()
}

/**
 * Get src path
 * @returns string
 */
const getSrcPath = (): string => {
  return getBasePath('src')
}

/**
 * Get base container path
 * @returns string
 */
const getAppContainersPath = (): string => {
  return path.join(getSrcPath(), '/Containers')
}

/**
 * Get ship path
 * @param _projectDir string value of the project directory [optional]
 * @returns string
 */
const getShipPath = (_projectDir?: string): string => {
  return path.join(getBasePath(_projectDir), 'src', '/Ship')
}

/**
 * Get section path by name
 * @param _section section name
 * @returns string
 */
const getSectionPath = (_section: string): string => {
  return path.join(getAppContainersPath(), '/', str.trimSlashes(_section))
}

/**
 * Get specific container path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getContainerPath = (_section: string, _container: string): string => {
  return path.join(getSectionPath(_section), '/', str.trimSlashes(_container))
}

/**
 * Get pages path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getPagesPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/pages')
}

/**
 * Get page api path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getApiPath = (_section: string, _container: string): string => {
  return path.join(getPagesPath(_section, _container), '/api')
}

/**
 * Get asset path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getAssetsPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/assets')
}

/**
 * Get config path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getConfigsPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/configs')
}

/**
 * Get components path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getComponentsPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/components')
}

/**
 * Get helpers path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getHelpersPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/helpers')
}

/**
 * Get hooks path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getHooksPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/hooks')
}

/**
 * Get actions path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getActionsPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/actions')
}

/**
 * Get styles path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getStylesPath = (_section: string, _container: string): string => {
  return path.join(getContainerPath(_section, _container), '/styles')
}

export const APP_ROOT = path.resolve(getBasePath())
export {
  containerScafffolding,
  shipScaffolding,
  getPath,
  getBasePath,
  getSrcPath,
  getAppContainersPath,
  getShipPath,
  getSectionPath,
  getContainerPath,
  getPagesPath,
  getApiPath,
  getAssetsPath,
  getConfigsPath,
  getComponentsPath,
  getHelpersPath,
  getHooksPath,
  getActionsPath,
  getStylesPath,
}
