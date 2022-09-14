import {Command, Flags} from '@oclif/core'

import {StatusService} from '../services/status-service'

export default class Status extends Command {
  static description = 'Check dotenv.org status'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    yes: Flags.boolean({
      char: 'y',
      description: 'Automatic yes to prompts. Assume yes to all prompts and run non-interactively.',
      hidden: false,
      required: false,
      default: false,
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Status)
    const yes = flags.yes

    await new StatusService({cmd: this, yes: yes}).run()
  }
}
