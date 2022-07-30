import {Command, Flags} from '@oclif/core'

import {OpenService} from '../services/open-service'

export default class Open extends Command {
  static description = 'Open project page'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Set environment to push to. Defaults to development',
      hidden: false,
    },
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
    const {args, flags} = await this.parse(Open)
    const environment = args.environment
    const yes = flags.yes

    await new OpenService({cmd: this, environment: environment, yes: yes}).run()
  }
}
