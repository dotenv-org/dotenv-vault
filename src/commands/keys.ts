import {Command, Flags} from '@oclif/core'

import {KeysService} from '../services/keys-service'

export default class Keys extends Command {
  static description = 'List .env.vault decryption keys'

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
    const {args, flags} = await this.parse(Keys)
    const environment = args.environment
    const dotenvMe = flags.dotenvMe
    const yes = flags.yes

    await new KeysService({cmd: this, environment: environment, dotenvMe: dotenvMe, yes: yes}).run()
  }
}
