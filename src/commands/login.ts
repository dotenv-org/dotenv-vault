import {Command} from '@oclif/core'

import {LoginService} from '../services/login-service'

export default class Login extends Command {
  static description = 'Login to Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    new LoginService({cmd: this}).run()
  }
}
