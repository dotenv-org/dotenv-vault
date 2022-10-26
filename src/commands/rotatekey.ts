import {Command, Flags} from '@oclif/core'

import {RotatekeyService} from '../services/rotatekey-service'

export default class Rotatekey extends Command {
  static description = 'Rotate DOTENV_KEY'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: true,
      description: 'Set environment to rotate',
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
    const {args, flags} = await this.parse(Rotatekey)
    const environment = args.environment
    const dotenvMe = flags.dotenvMe
    const yes = flags.yes

    await new RotatekeyService({cmd: this, environment: environment, dotenvMe: dotenvMe, yes: yes}).run()
  }
}
