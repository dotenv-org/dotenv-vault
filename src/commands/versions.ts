import {Command, Flags} from '@oclif/core'

import {VersionsService} from '../services/versions-service'

export default class Versions extends Command {
  static description = 'List all versions of your .env file'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Set environment to check versions against. Defaults to development',
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
    const {args, flags} = await this.parse(Versions)
    const environment = args.environment
    const dotenvMe = flags.dotenvMe
    const yes = flags.yes

    await new VersionsService({cmd: this, environment: environment, dotenvMe: dotenvMe, yes: yes}).run()
  }
}
