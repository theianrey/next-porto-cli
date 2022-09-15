"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStubContent = exports.getStylesPath = exports.getActionsPath = exports.getHooksPath = exports.getHelpersPath = exports.getComponentsPath = exports.getConfigsPath = exports.getAssetsPath = exports.getApiPath = exports.getPagesPath = exports.getContainerPath = exports.getSectionPath = exports.getAppContainersPath = exports.getSrcPath = exports.getBasePath = exports.getPath = exports.containerScafffolding = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable no-prototype-builtins */
const zod_1 = require("zod");
const path = require("node:path");
const str = require("./string");
const filesystem = require("./filesystem");
const _ = require("lodash");
// * context of parent this
const _this = this;
// * scaffold object definition
const ScaffoldObj = zod_1.z.object({
    section: zod_1.z.string(),
    container: zod_1.z.string(),
    // * paths
    srcPath: zod_1.z.string(),
    appContainersPath: zod_1.z.string(),
    sectionPath: zod_1.z.string(),
    containerPath: zod_1.z.string(),
    pagesPath: zod_1.z.string(),
    pagesApiPath: zod_1.z.string(),
    assetsPath: zod_1.z.string(),
    configsPath: zod_1.z.string(),
    componentsPath: zod_1.z.string(),
    helpersPath: zod_1.z.string(),
    hooksPath: zod_1.z.string(),
    actionsPath: zod_1.z.string(),
    stylesPath: zod_1.z.string(),
});
// * path object
const PathObj = zod_1.z.object({
    path: zod_1.z.string(),
    section: zod_1.z.string().optional(),
    container: zod_1.z.string().optional(),
});
// * extract params object from path object
const ParamsObj = PathObj.pick({ section: true, container: true });
// * -----------------------------------------------------------------------------
/**
 * Scaffold the container paths
 *
 * @param section section name
 * @param container container name
 * @returns ScaffolType
 */
const containerScafffolding = (section, container) => {
    return {
        section,
        container,
        srcPath: getPath('src'),
        appContainersPath: getAppContainersPath(),
        sectionPath: getPath('section', { section }),
        containerPath: getPath('container', { section, container }),
        pagesPath: getPath('pages', { section, container }),
        pagesApiPath: getPath('api', { section, container }),
        assetsPath: getPath('assets', { section, container }),
        configsPath: getPath('configs', { section, container }),
        componentsPath: getPath('components', { section, container }),
        helpersPath: getPath('helpers', { section, container }),
        hooksPath: getPath('hooks', { section, container }),
        actionsPath: getPath('actions', { section, container }),
        stylesPath: getPath('styles', { section, container }),
    };
};
exports.containerScafffolding = containerScafffolding;
/**
 * Get the path base on the section & container
 * @param _funcName function path short name
 * @param _params optional parameter for {section, container}
 * @returns string
 */
const getPath = (_funcName, _params) => {
    // * format the function path string to proper case
    // const capitalizeFunc = [
    //   _funcName.toLowerCase().charAt(0).toUpperCase(),
    //   _funcName.toLowerCase().slice(1),
    // ].join('')
    const capitalizeFunc = _.capitalize(_funcName);
    // * for path short names
    const callFuncString = `get${capitalizeFunc}Path`;
    if (!_this.hasOwnProperty(callFuncString) &&
        !(_this[callFuncString] instanceof Function)) {
        // * empty string
        throw new Error(`Invalid function call ${callFuncString}.`);
    }
    // * if params exists
    if (_params) {
        // * destruct optional params
        const { section, container } = _params;
        // * return path with params
        return ['', null, undefined].includes(container)
            ? _this[callFuncString](section)
            : _this[callFuncString](section, container);
    }
    // * return function without params
    return _this[callFuncString]();
};
exports.getPath = getPath;
/**
 * Get base application path, includes relative path if parameter exists
 * @param _path relative path from the root directory
 * @returns string
 */
const getBasePath = (_path) => {
    return _path
        ? path.join(process.cwd(), '/', str.trimSlashes(_path))
        : process.cwd();
};
exports.getBasePath = getBasePath;
/**
 * Get src path
 * @returns string
 */
const getSrcPath = () => {
    return getBasePath('src');
};
exports.getSrcPath = getSrcPath;
/**
 * Get base container path
 * @returns string
 */
const getAppContainersPath = () => {
    return path.join(getSrcPath(), '/Containers');
};
exports.getAppContainersPath = getAppContainersPath;
/**
 * Get section path by name
 * @param _section section name
 * @returns string
 */
const getSectionPath = (_section) => {
    return path.join(getAppContainersPath(), '/', str.trimSlashes(_section));
};
exports.getSectionPath = getSectionPath;
/**
 * Get specific container path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getContainerPath = (_section, _container) => {
    return path.join(getSectionPath(_section), '/', str.trimSlashes(_container));
};
exports.getContainerPath = getContainerPath;
/**
 * Get pages path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getPagesPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/pages');
};
exports.getPagesPath = getPagesPath;
/**
 * Get page api path
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getApiPath = (_section, _container) => {
    return path.join(getPagesPath(_section, _container), '/api');
};
exports.getApiPath = getApiPath;
/**
 * Get asset path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getAssetsPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/assets');
};
exports.getAssetsPath = getAssetsPath;
/**
 * Get config path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getConfigsPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/configs');
};
exports.getConfigsPath = getConfigsPath;
/**
 * Get components path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getComponentsPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/components');
};
exports.getComponentsPath = getComponentsPath;
/**
 * Get helpers path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getHelpersPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/helpers');
};
exports.getHelpersPath = getHelpersPath;
/**
 * Get hooks path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getHooksPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/hooks');
};
exports.getHooksPath = getHooksPath;
/**
 * Get actions path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getActionsPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/actions');
};
exports.getActionsPath = getActionsPath;
/**
 * Get styles path of the container
 * @param _section section name
 * @param _container container name
 * @returns string
 */
const getStylesPath = (_section, _container) => {
    return path.join(getContainerPath(_section, _container), '/styles');
};
exports.getStylesPath = getStylesPath;
const getStubContent = async (_path) => {
    return filesystem.readFile(_path);
};
exports.getStubContent = getStubContent;
