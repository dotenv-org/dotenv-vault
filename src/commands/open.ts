import {Command} from '@oclif/core'

import {OpenService} from '../services/open-service'

export default class Open extends Command {
  static description = 'Open Dotenv Vault project page'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    new OpenService({cmd: this}).run()
  }
}
