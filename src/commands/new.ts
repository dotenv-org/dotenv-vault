import {Command} from '@oclif/core'

import {NewService} from '../services/new-service'

export default class New extends Command {
  static description = 'Create your project at Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    new NewService({cmd: this}).run()
  }
}
