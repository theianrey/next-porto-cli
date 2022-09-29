import * as shipGenerator from './ship'
import * as containerGenerator from './container'
import type {ContainerPathsType, ShipPathsType} from '../helpers/path'

/**
 * Run generator
 * @param _paths paths to generate files
 * @returns void
 */
const generateFromPaths = async (
  _paths: ContainerPathsType | ShipPathsType | undefined,
): Promise<void> => {
  if (typeof _paths !== 'undefined') {
    // * generate dir files to create container layer
    if (Object.keys(_paths).includes('container')) {
      return containerGenerator.generateFromPaths(_paths as ContainerPathsType)
    }

    // * generate dir files to create ship layer
    return shipGenerator.generateFromPaths(_paths as ShipPathsType)
  }
}

export {generateFromPaths, shipGenerator, containerGenerator}
