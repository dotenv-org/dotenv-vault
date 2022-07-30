import {Command, Flags} from '@oclif/core'

import {PullService} from '../services/pull-service'

export default class Pull extends Command {
  static description = 'Pull .env securely'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Set environment to pull from. Defaults to development (writing to .env)',
      hidden: false,
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
      description: 'Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)',
      hidden: false,
      multiple: false,
      env: 'DOTENV_ME',
      required: false,
    }),
    yes: Flags.boolean({
      char: 'y',
      description: 'Automatic yes to prompts. Assume yes to all prompts and run non-interactively.',
      hidden: false,
      required: false,
      default: false,
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Pull)
    const environment = args.environment
    const filename = args.filename
    const dotenvMe = flags.dotenvMe
    const yes = flags.yes

    await new PullService({cmd: this, environment: environment, filename: filename, dotenvMe: dotenvMe, yes: yes}).run()
  }
}
