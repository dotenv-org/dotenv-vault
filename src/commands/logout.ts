import {Command, Flags} from '@oclif/core'

import {LogoutService} from '../services/logout-service'

export default class Logout extends Command {
  static description = 'Log out of dotenv-vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
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
    const {flags} = await this.parse(Logout)
    const yes = flags.yes

    new LogoutService({cmd: this, yes: yes}).run()
  }
}
