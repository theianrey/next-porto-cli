/* eslint-disable node/no-extraneous-import */
import 'module-alias/register'
import * as Listr from 'listr'
import {execa} from '@esm2cjs/execa'
import * as path from 'node:path'
import * as filesystem from '@helpers/filesystem'
import {CliUx, Command, Flags} from '@oclif/core'
import {generateConfig} from '@generators/config'
import {shipScaffolding, getBasePath} from '@helpers/path'
import {generateFromPaths, containerGenerator} from '@generators/index'

export default class Project extends Command {
  // * disable variable argument validation
  static strict = false

  // *
  static description = 'Create a Next.js application with porto architechture.'

  // *
  static tasks: Listr | undefined

  // * arguments
  static args = [
    {
      name: 'projectName',
      required: false,
      description:
        'The name of the directory where the application will be installed.',
    },
  ]

  // * flags
  static flags = {
    typescript: Flags.boolean({
      char: 't',
      description: 'Enable typescript support.',
      default: false,
      required: false,
    }),
    force: Flags.boolean({
      char: 'f',
      description: 'Force create a project on existing directory.',
      default: false,
      required: false,
    }),
  }

  /**
   * Initialize Tasks
   * @param _args project name argument
   * @param _flags check for typescript flag
   * @returns new Listr Object
   */
  initTaskList(
    _args: {[name: string]: any},
    _flags?: {typescript: boolean; force: boolean},
  ): Listr {
    return new Listr([
      {
        title: 'File checks...',
        task: async _ctx => {
          const projectDirExists = filesystem.fileExist(
            path.resolve('.', _args.projectName),
          )

          const emptyDir = await filesystem.isEmptyDir(
            path.resolve('.', _args.projectName),
          )

          // * check if the project directory exists & no empty
          if (projectDirExists && !emptyDir) {
            if (!_flags?.force) {
              // * file check context set to false
              _ctx.fileChecks = false
              throw new Error(
                `Directory "${_args.projectName}" already exists & not empty.`,
              )
            }

            // * force delete directory
            filesystem.forceDelete(path.resolve('.', _args.projectName))

            // * file check context set to true
            _ctx.fileChecks = true
          }

          // * file check context set to true (default)
          _ctx.fileChecks = true
        },
      },
      {
        title: 'Initialize Next.js...',
        task: async (_ctx, _task) => {
          const execArgs: string[] = [
            'create-next-app@latest',
            _args.projectName,
          ]

          // * add typescript support
          if (_flags?.typescript) {
            execArgs.push('--typescript')
          }

          return execa('npx', execArgs)
            .then(async () => {
              _ctx.nextInit = true
            })
            .catch(() => {
              _ctx.nextInit = false
              _task.skip(_task.output)
            })
        },
        enabled: ctx => ctx.fileChecks === true,
      },
      {
        title: 'Scaffolding your app...',
        task: async (_ctx, _task) => {
          const shipPaths = shipScaffolding(_args.projectName)

          // * generate ship paths
          await generateFromPaths(shipPaths)
          // * generate a default conatiners directory
          await containerGenerator.appcontainersGenerator(
            path.resolve(getBasePath(_args.projectName), 'src', 'Containers'),
          )

          _ctx.scaffolding = true
        },
        enabled: ctx => ctx.nextInit === true,
      },
      {
        title: 'Finishing up...',
        task: async _ctx => {
          await generateConfig(path.resolve(getBasePath(_args.projectName)))
        },
        enabled: _ctx => _ctx.scaffolding === true,
      },
    ])
  }

  /**
   * * Run the command (create:project)
   * @returns void
   */
  async run(): Promise<void> {
    // *
    const {flags, args} = await this.parse(Project)

    if (typeof args.projectName === 'undefined') {
      // * initiate manual prompt
      const projectName = await CliUx.ux.prompt('Enter the project name', {
        required: true,
      })

      // * set args new value for project name
      args.projectName = projectName
    }

    // * initiate the tasks
    Project.tasks = this.initTaskList(args, flags)

    // * run the task list
    await Project.tasks.run().catch(error => this.error(error.message))
  }
}
