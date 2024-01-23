import {Command} from '@oclif/core'

import {LocalKeysService} from '../../services/local/keys-service'

export default class LocalKeys extends Command {
  static description = '[DEPRECATED][Switch to dotenvx: github.com/dotenvx/dotenvx] List .env.vault local decryption keys from .env.keys file'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Set environment to fetch key(s) from. Defaults to all environments',
      hidden: false,
    },
  ]

  public async run(): Promise<void> {
    const {args} = await this.parse(LocalKeys)
    const environment = args.environment

    await new LocalKeysService({cmd: this, environment: environment}).run()
  }
}
