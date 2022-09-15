import 'module-alias/register'
import type {ScaffoldType} from '@helpers/path'
import {Command, CliUx, Flags} from '@oclif/core'
import {containerScafffolding} from '@helpers/path'
import {fileExist, forceDelete} from '@helpers/filesystem'
import {generateFromPaths} from '@helpers/generator'
import * as _ from 'lodash'

/**
 * Container command class
 */
export class Container extends Command {
  // * disable variable argument validation
  static strict = false

  // *
  static description = 'Create a container'

  // * get cli flags
  static flags = {
    section: Flags.string({
      char: 's',
      description: 'Name of the application section.',
      default: 'AppSection',
      require: true,
    }),
    container: Flags.string({
      char: 'c',
      description: 'Name of the container.',
      require: true,
      dependsOn: ['section'],
      default: '',
    }),
    force: Flags.boolean({
      char: 'f',
      description: 'To execute the command even the container already exists.',
      required: false,
      default: false,
    }),
  }

  // * run command
  async run(): Promise<void> {
    // *
    let scaffoldPaths: ScaffoldType | null = null

    // * get user input for flags
    const {flags} = await this.parse(Container)

    // * if container is missing in the command flag
    // * run manual prompt
    if (
      !Object.keys(flags).includes('container') ||
      ['', null, undefined].includes(flags.container)
    ) {
      // * trigger manual prompt

      // * section
      const section = await CliUx.ux.prompt('Enter section name', {
        default: 'AppSection',
        required: true,
      })

      // * container
      const container = await CliUx.ux.prompt('Enter container name', {
        required: true,
      })

      // * scaffold paths for container
      scaffoldPaths = containerScafffolding(section, _.capitalize(container))
    }

    // * flags complete
    if (scaffoldPaths === null) {
      scaffoldPaths = containerScafffolding(
        flags.section,
        _.capitalize(flags.container)
      )
    }

    // * check if the container exist
    if (fileExist(scaffoldPaths.containerPath) && flags.force === false) {
      this.log('Container already exists')
      this.exit(1)
    }

    // * override exisitng container
    if (fileExist(scaffoldPaths.containerPath) && flags.force) {
      const deleteExistingContainer = await CliUx.ux.confirm(
        'This will delete the exisitng container and all of its content, continue?'
      )

      // * delete container
      if (deleteExistingContainer) {
        await forceDelete(scaffoldPaths.containerPath)
      } else {
        this.exit(0)
      }
    }

    // * generate container contents from paths
    generateFromPaths(scaffoldPaths)
  }
}
