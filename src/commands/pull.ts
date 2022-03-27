import {Command, Flags} from '@oclif/core'

import {PullService} from '../services/pull-service'

export default class Pull extends Command {
  static description = 'Pull .env securely from Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Pull .env.ci, .env.staging, and .env.production',
      hidden: false,
      default: 'development',
      options: ['development', 'ci', 'staging', 'production'],
    },
    {
      name: 'filename',
      required: false,
      description: 'Set output filename. Defaults to .env for development and .env.{environment} for other environments',
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
    const {args, flags} = await this.parse(Pull)
    const environment = args.environment
    const filename = args.filename
    const dotenvMe = flags.dotenvMe

    new PullService({cmd: this, environment: environment, filename: filename, dotenvMe: dotenvMe}).run()
  }
}
