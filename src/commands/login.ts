import {Command, Flags} from '@oclif/core'

import {LoginService} from '../services/login-service'

export default class Login extends Command {
  static description = 'Log in to dotenv-vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'dotenvMe',
      required: false,
      description: 'Set .env.me credential. Defaults to generated value.',
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
    const {args, flags} = await this.parse(Login)
    const dotenvMe = args.dotenvMe
    const yes = flags.yes

    await new LoginService({cmd: this, dotenvMe: dotenvMe, yes: yes}).run()
  }
}
