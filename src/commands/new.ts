import {Command, Flags} from '@oclif/core'

import {NewService} from '../services/new-service'

export default class New extends Command {
  static description = 'Create your project'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'DOTENV_VAULT',
      required: false,
      description: 'Set .env.vault identifier. Defaults to generated value.',
      hidden: false,
    },
  ]

  static flags = {
    yes: Flags.boolean({
      char: 'y',
      description: 'Automatic yes to prompts. Assume yes to all prompts and run non-interactively.',
      hidden: false,
      required: false,
      default: false,
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(New)
    const dotenvVault = args.DOTENV_VAULT
    const yes = flags.yes

    await new NewService({cmd: this, dotenvVault: dotenvVault, yes: yes}).run()
  }
}
