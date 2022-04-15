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
      description: 'Set input filename. Defaults to .env',
      hidden: false,
    },
    {
      name: 'environment',
      required: false,
      description: 'Set environment to push to. Defaults to development',
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
    const environment = args.environment
    const dotenvMe = flags.dotenvMe

    new PushService({cmd: this, filename: filename, environment: environment, dotenvMe: dotenvMe}).run()
  }
}
