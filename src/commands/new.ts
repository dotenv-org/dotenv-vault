import {Command, Flags, CliUx} from '@oclif/core'

import {vars} from '../vars'

import {existsSync, writeFileSync} from 'node:fs'

export default class New extends Command {
  static description = 'Create your project at Dotenv Vault'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const url = vars.apiUrl + '/new'

    this.log('local:')

    if (existsSync('.env.project')) {
      // this.log(`local: Already exists at ${process.cwd()}/.env.project`)
      this.log('local: Existing .env.project')
      this.log('local:')
    } else {
      this.log('local: Creating .env.project')
      this.log('local:')
      writeFileSync('.env.project', `DOTENV_PROJECT=missing # Generate your Dotenv Vault project identifier at ${url}`)
    }

    const answer = await CliUx.ux.confirm(`Open webpage at ${url}? Type yes (y) or no (n)`)
    if (answer) {
      CliUx.ux.open(url)
      this.log('local:')
      this.log('local: 💡ProTip! The .env.project file securely identifies your project at Dotenv Vault')
      this.log('local:')
      const dotenvProject = await CliUx.ux.prompt('What is your .env.project identifier?', {type: 'mask'})
      writeFileSync('.env.project', `DOTENV_PROJECT=${dotenvProject}`)
      this.log('Completed.')
      this.log('')
      this.log('What\'s next? You should commit your .env.project to source control and then run `npx dotenv-vault push`')
    } else {
      console.log('Aborted.')
    }
  }
}
