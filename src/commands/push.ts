import {Command, Flags} from '@oclif/core'

import {PushService} from '../services/push-service'

export default class Push extends Command {
  static description = 'Push .env securely'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Set environment to push from. Defaults to development',
      hidden: false,
    },
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
    const {args, flags} = await this.parse(Push)
    const environment = args.environment
    const filename = args.filename
    const dotenvMe = flags.dotenvMe
    const yes = flags.yes

    await new PushService({cmd: this, environment: environment, filename: filename, dotenvMe: dotenvMe, yes: yes}).run()
  }
}
