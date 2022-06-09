import {Command} from '@oclif/core'

import {LoginService} from '../services/login-service'

export default class Login extends Command {
  static description = 'Login to Dotenv Vault'

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

  public async run(): Promise<void> {
    const {args} = await this.parse(Login)
    const dotenvMe = args.dotenvMe

    new LoginService({cmd: this, dotenvMe: dotenvMe}).run()
  }
}
