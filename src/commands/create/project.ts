import 'module-alias/register'
import {Command} from '@oclif/core'

export class Project extends Command {
  // * disable variable argument validation
  static strict = false

  // *
  static description = 'Create a container'

  async run(): Promise<void> {
    this.log('Create a project boilerplate.')
  }
}
