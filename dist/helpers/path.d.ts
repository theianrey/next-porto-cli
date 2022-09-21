import { z } from 'zod';
declare const ScaffoldObj: z.ZodObject<{
    section: z.ZodString;
    container: z.ZodString;
    srcPath: z.ZodString;
    appContainersPath: z.ZodString;
    sectionPath: z.ZodString;
    containerPath: z.ZodString;
    pagesPath: z.ZodString;
    pagesApiPath: z.ZodString;
    assetsPath: z.ZodString;
    configsPath: z.ZodString;
    componentsPath: z.ZodString;
    helpersPath: z.ZodString;
    hooksPath: z.ZodString;
    actionsPath: z.ZodString;
    stylesPath: z.ZodString;
}, "strip", z.ZodTypeAny, {
    section: string;
    container: string;
    srcPath: string;
    appContainersPath: string;
    sectionPath: string;
    containerPath: string;
    pagesPath: string;
    pagesApiPath: string;
    assetsPath: string;
    configsPath: string;
    componentsPath: string;
    helpersPath: string;
    hooksPath: string;
    actionsPath: string;
    stylesPath: string;
}, {
    section: string;
    container: string;
    srcPath: string;
    appContainersPath: string;
    sectionPath: string;
    containerPath: string;
    pagesPath: string;
    pagesApiPath: string;
    assetsPath: string;
    configsPath: string;
    componentsPath: string;
    helpersPath: string;
    hooksPath: string;
    actionsPath: string;
    stylesPath: string;
}>;
declare const PathObj: z.ZodObject<{
    path: z.ZodString;
    section: z.ZodOptional<z.ZodString>;
    container: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    section?: string | undefined;
    container?: string | undefined;
    path: string;
}, {
    section?: string | undefined;
    container?: string | undefined;
    path: string;
}>;
declare const ParamsObj: z.ZodObject<Pick<{
    path: z.ZodString;
    section: z.ZodOptional<z.ZodString>;
    container: z.ZodOptional<z.ZodString>;
}, "section" | "container">, "strip", z.ZodTypeAny, {
    section?: string | undefined;
    container?: string | undefined;
}, {
    section?: string | undefined;
    container?: string | undefined;
}>;
export declare type ScaffoldType = z.infer<typeof ScaffoldObj>;
export declare type PathType = z.infer<typeof PathObj>;
export declare type ParamsType = z.infer<typeof ParamsObj>;
/**
 * Scaffold the container paths
 *
 * @param section section name
 * @param container container name
 * @returns ScaffolType
 */
declare const containerScafffolding: (section: string, container: string) => ScaffoldType;
/**
 * Get the path base on the section & container
 * @param _funcName function path short name
 * @param _params optional parameter for {section, container}
 * @returns string
 */
declare const getPath: (_funcName: string, _params?: ParamsType) => string;
/**
 * Get base application path, includes relative path if parameter exists
 * @param _path relative path from the root directory
 * @returns string
 */
declare const getBasePath: (_path?: string) => string;
/**
 * Get src path
 * @returns string
 */
declare const getSrcPath: () => string;
/**
 * Get base container path
 * @returns string
 */
declare const getAppContainersPath: () => string;
/**
 * Get section path by name
 * @param _section section name
 * @returns string
 */
declare const getSectionPath: (_section: string) => string;
/**
 * Get specific container path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getContainerPath: (_section: string, _container: string) => string;
/**
 * Get pages path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getPagesPath: (_section: string, _container: string) => string;
/**
 * Get page api path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getApiPath: (_section: string, _container: string) => string;
/**
 * Get asset path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getAssetsPath: (_section: string, _container: string) => string;
/**
 * Get config path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getConfigsPath: (_section: string, _container: string) => string;
/**
 * Get components path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getComponentsPath: (_section: string, _container: string) => string;
/**
 * Get helpers path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getHelpersPath: (_section: string, _container: string) => string;
/**
 * Get hooks path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getHooksPath: (_section: string, _container: string) => string;
/**
 * Get actions path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getActionsPath: (_section: string, _container: string) => string;
/**
 * Get styles path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
declare const getStylesPath: (_section: string, _container: string) => string;
export { containerScafffolding, getPath, getBasePath, getSrcPath, getAppContainersPath, getSectionPath, getContainerPath, getPagesPath, getApiPath, getAssetsPath, getConfigsPath, getComponentsPath, getHelpersPath, getHooksPath, getActionsPath, getStylesPath, };
