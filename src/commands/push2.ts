import {Command, Flags} from '@oclif/core'

import {Push2Service} from '../services/push2-service'

export default class Push2 extends Command {
  static description = 'Push .env securely to Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Set environment to push to. Defaults to development',
      hidden: false,
    },
    {
      name: 'filename',
      required: false,
      description: 'Set input filename. Defaults to .env',
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
    const {args, flags} = await this.parse(Push2)
    const environment = args.environment
    const filename = args.filename
    const dotenvMe = flags.dotenvMe

    new Push2Service({cmd: this, environment: environment, filename: filename, dotenvMe: dotenvMe}).run()
  }
}