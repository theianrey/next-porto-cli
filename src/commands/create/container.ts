import 'module-alias/register'
import {Command, CliUx, Flags} from '@oclif/core'
import {containerScafffolding} from '@helpers/path'

export class Container extends Command {
  // * disable variable argument validation
  static strict = false

  // *
  static description = 'Create a container'

  // * get cli flags
  // static flags = {
  //   section: Flags.string({
  //     char: 's',
  //     description: 'Name of the application section.',
  //     default: 'AppSection',
  //     require: true,
  //   }),
  //   container: Flags.string({
  //     char: 'c',
  //     description: 'Name of the container.',
  //     require: true,
  //     dependsOn: ['section'],
  //   }),
  // }

  // * run command
  async run(): Promise<void> {
    const {flags} = await this.parse(Container)

    // * trigger manual prompt
    const section = await CliUx.ux.prompt('Enter section name', {
      default: 'AppSection',
      required: true,
    })

    const container = await CliUx.ux.prompt('Enter container name', {
      required: true,
    })

    // *
    console.log(containerScafffolding(section, container))
  }
}
