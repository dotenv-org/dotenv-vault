import {Command, Flags} from '@oclif/core'

import {WhoamiService} from '../services/whoami-service'

export default class Whoami extends Command {
  static description = 'Display the current logged in user'

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
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Whoami)
    const dotenvMe = flags.dotenvMe

    await new WhoamiService({cmd: this, dotenvMe: dotenvMe}).run()
  }
}
