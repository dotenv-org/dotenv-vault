import {Command, Flags} from '@oclif/core'

import {OpenService} from '../services/open-service'

export default class Open extends Command {
  static description = 'Open dotenv-vault project page'

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
    const {flags} = await this.parse(Open)
    const yes = flags.yes

    await new OpenService({cmd: this, yes: yes}).run()
  }
}
