import 'module-alias/register'
import {Command, CliUx, Flags} from '@oclif/core'
import {containerScafffolding} from '@helpers/path'

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
  }

  // * run command
  async run(): Promise<void> {
    const {flags} = await this.parse(Container)

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

      // *
      console.log(containerScafffolding(section, container))
      this.exit(1)
    }

    console.log(containerScafffolding(flags.section, flags.container))
  }
}
