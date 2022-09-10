import {z} from 'zod'
import * as path from 'path'
import * as String from '@helpers/string'

// * scaffold object definition
const ScaffoldObj = z.object({
  section: z.string(),
  container: z.string(),
  // * paths
  srcPath: z.string(),
  appContainersPath: z.string(),
  SectionPath: z.string(),
  ContainerPath: z.string(),
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
type ScaffoldType = z.infer<typeof ScaffoldObj>

// * -----------------------------------------------------------------------------
/**
 * Scaffold the container paths
 *
 * @param section string
 * @param container string
 * @returns ScaffolType
 */
const containerScafffolding = (
  section: string,
  container: string
): ScaffoldType => {
  return {
    section,
    container,
    srcPath: getSrcPath(),
    appContainersPath: getBaseContainersPath(),
    SectionPath: getSectionPath(section),
    ContainerPath: getContainerPath(section, container),
    pagesPath: getPagesPath(section, container),
    pagesApiPath: getPagesApiPath(section, container),
    assetsPath: getAssetsPath(section, container),
    configsPath: getConfigsPath(section, container),
    componentsPath: getComponentsPath(section, container),
    helpersPath: getHelpersPath(section, container),
    hooksPath: getHooksPath(section, container),
    actionsPath: getActionsPath(section, container),
    stylesPath: getStylesPath(section, container),
  }
}

/**
 * Get base application path, includes relative path if parameter exists
 * @param _path string relative path from the base path
 * @returns string
 */
const basePath = (_path: string): string => {
  return path.join(process.cwd(), '/', String.trimSlashes(_path))
}

/**
 * return src path
 * @returns string
 */
const getSrcPath = (): string => {
  return basePath('src')
}

/**
 * Get base container path
 * @returns string
 */
const getBaseContainersPath = (): string => {
  return path.join(getSrcPath(), '/Containers')
}

/**
 * Get section path by name
 * @param section string section name
 * @returns string
 */
const getSectionPath = (section: string): string => {
  return path.join(getBaseContainersPath(), '/', String.trimSlashes(section))
}

/**
 * Get specific container path
 * @param section string
 * @param container string
 * @returns string
 */
const getContainerPath = (section: string, container: string): string => {
  return path.join(getSectionPath(section), '/', String.trimSlashes(container))
}

/**
 * Get pages path
 * @param section string
 * @param container string
 * @returns string
 */
const getPagesPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/pages')
}

/**
 * Get page api path
 * @param section string
 * @param container string
 * @returns string
 */
const getPagesApiPath = (section: string, container: string): string => {
  return path.join(getPagesPath(section, container), '/api')
}

/**
 * Get asset path of the container
 * @param section string
 * @param container string
 * @returns string
 */
const getAssetsPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/assets')
}

/**
 * Get config path of the container
 * @param section string
 * @param container string
 * @returns string
 */
const getConfigsPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/configs')
}

/**
 * Get components path of the container
 * @param section string
 * @param container string
 * @returns string
 */
const getComponentsPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/components')
}

/**
 * Get helpers path of the container
 * @param section string
 * @param container string
 * @returns string
 */
const getHelpersPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/helpers')
}

/**
 * Get hooks path of the container
 * @param section string
 * @param container string
 * @returns string
 */
const getHooksPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/hooks')
}

/**
 * Get actions path of the container
 * @param section string
 * @param container string
 * @returns string
 */
const getActionsPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/actions')
}

/**
 * Get styles path of the container
 * @param section string
 * @param container string
 * @returns string
 */
const getStylesPath = (section: string, container: string): string => {
  return path.join(getContainerPath(section, container), '/styles')
}

export {
  containerScafffolding,
  basePath,
  getSrcPath,
  getBaseContainersPath,
  getSectionPath,
  getContainerPath,
  getPagesPath,
  getPagesApiPath,
  getAssetsPath,
  getConfigsPath,
  getComponentsPath,
  getHelpersPath,
  getHooksPath,
  getActionsPath,
  getStylesPath,
}
