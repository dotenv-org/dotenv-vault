import {Command} from '@oclif/core'

import {NewService} from '../services/new-service'

export default class New extends Command {
  static description = 'Create your project at Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'dotenvProject',
      required: false,
      description: 'Set .env.project identifier. Defaults to user prompt.',
      hidden: false,
    },
  ]

  public async run(): Promise<void> {
    const {args} = await this.parse(New)
    const dotenvProject = args.dotenvProject

    new NewService({cmd: this, dotenvProject: dotenvProject}).run()
  }
}
