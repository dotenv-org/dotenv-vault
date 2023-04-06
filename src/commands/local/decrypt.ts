import {Command} from '@oclif/core'

import {LocalDecryptService} from '../../services/local/decrypt-service'

export default class LocalDecrypt extends Command {
  static description = 'Decrypt .env.vault from local only'

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
    const {args} = await this.parse(LocalDecrypt)
    const dotenvKey = args.DOTENV_KEY

    await new LocalDecryptService({cmd: this, dotenvKey: dotenvKey}).run()
  }
}
