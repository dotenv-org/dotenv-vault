import {vars} from '../vars'
import {existsSync, writeFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'

class NewService {
  get url(): string {
    return vars.apiUrl + '/new'
  }

  get existingEnvProject(): boolean {
    return existsSync('.env.project')
  }

  async run(): Promise<void> {
    console.log('local:')

    if (this.existingEnvProject) {
      this._logExistingEnvProject()
    } else {
      this._logCreatingEnvProject()
      this._writeEnvProject()
    }

    const answer = await CliUx.ux.confirm(`Open webpage at ${this.url}? Type yes (y) or no (n)`)

    if (answer) {
      CliUx.ux.open(this.url)
      this._logProTip()

      const dotenvProject = await CliUx.ux.prompt('What is your .env.project identifier?', {type: 'mask'})
      writeFileSync('.env.project', `DOTENV_PROJECT=${dotenvProject}`)
      this._logCompleted()
    } else {
      this._logAborted()
    }
  }

  _logExistingEnvProject(): void {
    console.log('local: Existing .env.project')
    console.log('local:')
  }

  _logCreatingEnvProject(): void {
    console.log('local: Creating .env.project')
    console.log('local:')
  }

  _writeEnvProject(): void {
    writeFileSync('.env.project', `DOTENV_PROJECT=missing # Generate your Dotenv Vault project identifier at ${this.url}`)
  }

  _logAborted(): void {
    console.log('Aborted.')
  }

  _logProTip(): void {
    console.log('local:')
    console.log('local: 💡ProTip! The .env.project file securely identifies your project at Dotenv Vault')
    console.log('local:')
  }

  _logCompleted(): void {
    console.log('Completed.')
    console.log('')
    console.log('What\'s next? You should commit your .env.project to source control and then run `npx dotenv-vault push`')
  }
}

export {NewService}
