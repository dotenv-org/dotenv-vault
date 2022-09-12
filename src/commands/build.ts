import {Command, Flags} from '@oclif/core'

import {BuildService} from '../services/build-service'

export default class Build extends Command {
  static description = 'Build .env.vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
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
    const {flags} = await this.parse(Build)
    const dotenvMe = flags.dotenvMe
    const yes = flags.yes

    await new BuildService({cmd: this, dotenvMe: dotenvMe, yes: yes}).run()
  }
}
