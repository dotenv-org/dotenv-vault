import {Command} from '@oclif/core'

import {NewService} from '../services/new-service'

export default class New extends Command {
  static description = 'Create your project at Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'dotenvVault',
      required: false,
      description: 'Set .env.vault identifier. Defaults to generated value.',
      hidden: false,
    },
  ]

  public async run(): Promise<void> {
    const {args} = await this.parse(New)
    const dotenvVault = args.dotenvVault

    new NewService({cmd: this, dotenvVault: dotenvVault}).run()
  }
}
