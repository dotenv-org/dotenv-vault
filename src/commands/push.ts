import {Command, Flags} from '@oclif/core'

import {PushService} from '../services/push-service'

export default class Push extends Command {
  static description = 'Push .env securely to Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'filename',
      required: false,
      description: 'Set input filename. Defaults to .env for development and .env.{environment} for other environments',
      hidden: false,
    },
  ]

  static flags = {
    dotenvMe: Flags.string({
      char: 'm',
      description: 'Pass .env.me credential directly (rather than reading from .env.me file)',
      hidden: false,
      multiple: false,
      env: 'DOTENV_ME',
      required: false,
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Push)
    const filename = args.filename
    const dotenvMe = flags.dotenvMe

    new PushService({cmd: this, filename: filename, dotenvMe: dotenvMe}).run()
  }
}
