"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
require("module-alias/register");
const core_1 = require("@oclif/core");
const path_1 = require("@helpers/path");
const filesystem_1 = require("@helpers/filesystem");
const generator_1 = require("@helpers/generator");
const _ = require("lodash");
/**
 * Container command class
 */
class Container extends core_1.Command {
    // * run command
    async run() {
        // *
        let scaffoldPaths = null;
        // * get user input for flags
        const { flags } = await this.parse(Container);
        // * if container is missing in the command flag
        // * run manual prompt
        if (!Object.keys(flags).includes('container') ||
            ['', null, undefined].includes(flags.container)) {
            // * trigger manual prompt
            // * section
            const section = await core_1.CliUx.ux.prompt('Enter section name', {
                default: 'AppSection',
                required: true,
            });
            // * container
            const container = await core_1.CliUx.ux.prompt('Enter container name', {
                required: true,
            });
            // * scaffold paths for container
            scaffoldPaths = (0, path_1.containerScafffolding)(section, _.capitalize(container));
        }
        // * flags complete
        if (scaffoldPaths === null) {
            scaffoldPaths = (0, path_1.containerScafffolding)(flags.section, _.capitalize(flags.container));
        }
        // * check if the container exist
        if ((0, filesystem_1.fileExist)(scaffoldPaths.containerPath) && flags.force === false) {
            this.log('Container already exists');
            this.exit(1);
        }
        // * override exisitng container
        if ((0, filesystem_1.fileExist)(scaffoldPaths.containerPath) && flags.force) {
            const deleteExistingContainer = await core_1.CliUx.ux.confirm('This will delete the exisitng container and all of its content, continue?');
            // * delete container
            if (deleteExistingContainer) {
                await (0, filesystem_1.forceDelete)(scaffoldPaths.containerPath);
            }
            else {
                this.exit(0);
            }
        }
        // * generate container contents from paths
        (0, generator_1.generateFromPaths)(scaffoldPaths);
    }
}
exports.Container = Container;
// * disable variable argument validation
Container.strict = false;
// *
Container.description = 'Create a container';
// * get cli flags
Container.flags = {
    section: core_1.Flags.string({
        char: 's',
        description: 'Name of the application section.',
        default: 'AppSection',
        require: true,
    }),
    container: core_1.Flags.string({
        char: 'c',
        description: 'Name of the container.',
        require: true,
        dependsOn: ['section'],
        default: '',
    }),
    force: core_1.Flags.boolean({
        char: 'f',
        description: 'To execute the command even the container already exists.',
        required: false,
        default: false,
    }),
};
