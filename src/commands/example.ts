import {Command, Flags} from '@oclif/core'
import {ExampleService} from '../services/example-service'

export default class Example extends Command {
  static description = 'Generate .env.example file from .env'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Set environment to create .env.example from. Defaults to production',
      hidden: false,
    },
    {
      name: 'filename',
      required: false,
      description: 'Set output filename. Defaults to .env.example',
      hidden: false,
    }
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
      required: false,
      default: false,
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Example)
    const yes = flags.yes
    const environment = flags.environment
    const filename = flags.filename
    const dotenvMe = flags.dotenvMe

    await new ExampleService({cmd: this, yes: yes, environment: environment, filename: filename, dotenvMe: dotenvMe}).run()
  }
}
