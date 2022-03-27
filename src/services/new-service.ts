import {vars} from '../vars'
import {existsSync, writeFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'

interface NewServiceAttrs {
  cmd;
}

class NewService {
  public cmd;

  constructor(attrs: NewServiceAttrs = {} as NewServiceAttrs) {
    this.cmd = attrs.cmd
  }

  get url(): string {
    return vars.apiUrl + '/new'
  }

  get existingEnvProject(): boolean {
    return existsSync('.env.project')
  }

  async run(): Promise<void> {
    new AppendToGitignoreService().run()

    this.cmd.log('local:')

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
    this.cmd.log('local: Existing .env.project')
    this.cmd.log('local:')
  }

  _logCreatingEnvProject(): void {
    this.cmd.log('local: Creating .env.project')
    this.cmd.log('local:')
  }

  _writeEnvProject(): void {
    writeFileSync('.env.project', `DOTENV_PROJECT= # Generate your Dotenv Vault project identifier at ${this.url}`)
  }

  _logAborted(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log(`You must visit ${this.url} to create your .env.project identifier. Try again.`)
  }

  _logProTip(): void {
    this.cmd.log('local:')
    this.cmd.log('local: 💡ProTip! The .env.project file securely identifies your project at Dotenv Vault')
    this.cmd.log('local:')
  }

  _logCompleted(): void {
    this.cmd.log('Completed.')
    this.cmd.log('')
    this.cmd.log('What\'s next? You should commit your .env.project to git and then run `npx dotenv-vault push`')
  }
}

export {NewService}
