import 'module-alias/register';
import type { ScaffoldType } from './path';
/**
 * Create files from paths
 * @param _scaffoldPaths object containing the file paths to scaffold
 * @returns void
 */
declare const generateFromPaths: (_scaffoldPaths: ScaffoldType) => Promise<void>;
/**
 * Run file generator function base on the ff. parameters
 * @param _generator generator name function
 * @param _path path to generate the file
 * @returns void
 */
declare const runGenerator: (_generator: string, _path: string) => Promise<void>;
/**
 * Generate assets directory
 * @param _path path to generate the file
 * @returns void
 */
declare const assetsGenerator: (_path: string) => Promise<void>;
/**
 * Generate configs directory
 * @param _path path to generate the file
 * @returns void
 */
declare const configsGenerator: (_path: string) => Promise<void>;
/**
 * Generate components directory
 * @param _path path to generate the file
 * @returns void
 */
declare const componentsGenerator: (_path: string) => Promise<void>;
/**
 * Generate helpers directory
 * @param _path path to generate the file
 * @returns void
 */
declare const helpersGenerator: (_path: string) => Promise<void>;
/**
 * Generate hooks directory
 * @param _path path to generate the file
 * @returns void
 */
declare const hooksGenerator: (_path: string) => Promise<void>;
/**
 * Generate actions directory
 * @param _path path to generate the file
 * @returns void
 */
declare const actionsGenerator: (_path: string) => Promise<void>;
/**
 * Generate styles directory
 * @param _path path to generate the file
 * @returns void
 */
declare const stylesGenerator: (_path: string) => Promise<void>;
/**
 * Generate pages directory for container & bootstrap it to root pages directory
 * @param _path path to generate the file
 * @returns void
 */
declare const pagesGenerator: (_path: string) => Promise<void>;
/**
 * Generate pages api directory
 * @param _path path to generate the file
 * @returns void
 */
declare const pagesApiGenerator: (_path: string) => Promise<void>;
export { generateFromPaths, runGenerator, assetsGenerator, configsGenerator, componentsGenerator, helpersGenerator, hooksGenerator, actionsGenerator, stylesGenerator, pagesGenerator, pagesApiGenerator, };
