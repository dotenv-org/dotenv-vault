import {Command} from '@oclif/core'

import {DecryptService} from '../services/decrypt-service'

export default class Decrypt extends Command {
  static description = 'Decrypt .env.vault locally'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'DOTENV_KEY',
      required: true,
      description: 'Set decryption key',
      hidden: false,
    },
  ]

  public async run(): Promise<void> {
    const {args} = await this.parse(Decrypt)
    const dotenvKey = args.DOTENV_KEY

    await new DecryptService({cmd: this, dotenvKey: dotenvKey}).run()
  }
}
