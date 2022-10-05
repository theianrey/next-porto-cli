import 'module-alias/register'
import * as _ from 'lodash'
import * as path from 'node:path'
import {getPath, APP_ROOT} from '@helpers/path'
import type {PagePathType} from '@helpers/path'
import {Command, CliUx, Flags} from '@oclif/core'
import {generateFromPaths} from '@generators/container'
import {fileExist, forceDelete} from '@helpers/filesystem'

export default class Page extends Command {
  // * disable variable argument validation
  static strict = false

  // *
  static description = 'Create a page & page api files for container'

  // * command flags
  static flags = {
    section: Flags.string({
      char: 's',
      required: true,
      default: 'AppSection',
      description: 'Section name',
    }),
    container: Flags.string({
      char: 'c',
      required: false,
      dependsOn: ['section'],
      description: 'Container name',
    }),
    page: Flags.string({
      char: 'p',
      required: false,
      dependsOn: ['container'],
      description: 'Page path',
    }),
    api: Flags.boolean({
      char: 'a',
      required: false,
      default: false,
      description: 'Will include api page files',
    }),
    force: Flags.boolean({
      char: 'f',
      required: false,
      default: false,
      description: 'Override the existing page files',
    }),
  }

  /**
   * Run the command
   * @returns void
   */
  async run(): Promise<void> {
    // *
    let force = false
    // *
    let pagePath: PagePathType | null = null

    // * get user input for flags
    let {flags} = await this.parse(Page)

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

      // * page
      const page = await CliUx.ux.prompt('Enter page path', {
        required: true,
      })

      // * api
      const api = await CliUx.ux.confirm('Would you like to include api page?')

      // * override flags k/v
      flags = {
        section,
        container,
        page,
        api,
        force,
        json: true,
      }

      // * scaffold paths for container page
      pagePath = {
        section,
        container,
        pagesPath: path.resolve(
          getPath('pages', {section, container}),
          container.toLowerCase(),
          page,
        ),
      }

      // * append api path
      if (api) {
        pagePath.pagesApiPath = path.resolve(
          getPath('api', {section, container}),
          container.toLowerCase(),
          page,
        )
      }
    }

    // * flags complete
    if (pagePath === null) {
      // * scaffold paths for container page
      pagePath = {
        section: flags.section,
        container: flags.container,
        pagesPath: path.resolve(
          getPath('pages', {
            section: flags.section,
            container: flags.container,
          }),
          flags?.container?.toLowerCase() as string,
          flags?.page as string,
        ),
      }

      // * append api path
      if (flags.api) {
        pagePath.pagesApiPath = path.resolve(
          getPath('api', {section: flags.section, container: flags.container}),
          flags?.container?.toLowerCase() as string,
          flags.page as string,
        )
      }
    }

    // * override exisitng container
    if (fileExist(pagePath.pagesPath as string) && flags.force) {
      const deleteExistingContainer = await CliUx.ux.confirm(
        'This will delete the exisitng container and all of its content, continue?',
      )

      // * delete container
      if (deleteExistingContainer) {
        // * container page
        forceDelete(pagePath.pagesPath as string)

        if (flags.api) {
          // * container api page
          forceDelete(pagePath.pagesApiPath as string)
        }
      } else {
        this.exit(0)
      }
    }

    // * generate page paths
    generateFromPaths(pagePath)
  }
}
