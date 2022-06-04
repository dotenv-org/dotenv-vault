import * as dotenv from 'dotenv'
import chalk from 'chalk'
import {vars} from '../vars'
import {existsSync, writeFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'

interface NewServiceAttrs {
  cmd;
  dotenvProject;
}

class NewService {
  public cmd;
  public dotenvProject;
  public log;

  constructor(attrs: NewServiceAttrs = {} as NewServiceAttrs) {
    this.cmd = attrs.cmd
    this.dotenvProject = attrs.dotenvProject
    this.log = new LogService({cmd: attrs.cmd})
  }

  get vaultFilename(): string {
    // if .env.vault file exists use it. otherwise use .env.project
    if (existsSync('.env.vault')) {
      return '.env.vault'
    }

    return '.env.project'
  }

  get vaultKey(): string {
    if (this.vaultFilename === '.env.vault') {
      return 'DOTENV_VAULT'
    }

    return 'DOTENV_PROJECT'
  }

  get vaultValue(): string {
    return (dotenv.config({path: this.vaultFilename}).parsed || {})[this.vaultKey]
  }

  get url(): string {
    return vars.apiUrl + '/new'
  }

  get urlWithProjectName(): string {
    const dir = process.cwd()
    const splitDir = dir.split('\\').join('/').split('/') // handle windows and unix paths
    const projectName = splitDir[splitDir.length - 1]

    return `${this.url}?project_name=${projectName}`
  }

  get existingEnv(): boolean {
    return existsSync('.env')
  }

  get existingEnvVault(): boolean {
    return existsSync(this.vaultFilename)
  }

  async run(): Promise<void> {
    this.log.local(chalk.dim('⬢ dotenv-vault new'))

    new AppendToDockerignoreService().run()
    new AppendToGitignoreService().run()
    new AppendToNpmignoreService().run()

    // Step 1
    this.log.local('')
    this.log.local(chalk.dim('▼ step 1: check for files'))

    if (this.existingEnv) {
      this.log.local(`.env ${chalk.dim('(exists)')}`)
    } else {
      this.log.local(`.env ${chalk.green('(created)')}`)
      this._writeEnv()
    }

    if (this.existingEnvVault) {
      this.log.local(`${this.vaultFilename} ${chalk.dim('(exists)')}`)
    } else {
      this.log.local(`${this.vaultFilename} ${chalk.green('(created)')}`)
      this._writeEnvVault()
    }

    // Step 2 B
    if (this.dotenvProject) {
      // Step 2 A
      this.log.local('')
      this.log.local(chalk.dim('▼ step 2: open url'))
      this.log.local('Skipping')

      // Step 3
      this.log.local('')
      this.log.local(chalk.dim(`▼ step 3: enter ${this.vaultFilename} identifier`))
      this.log.local('Adding')

      if (this.invalidIdentifier(this.dotenvProject)) {
        this.abortWithInvalidIdentifier()
      }

      this._logWritingEnvVault()
      writeFileSync(this.vaultFilename, `${this.vaultKey}=${this.dotenvProject}`)
      this._logCompleted()
      return
    }

    // Step 2 A
    this.log.local('')
    this.log.local(chalk.dim('▼ step 2: open url'))
    this.log.local(`Open ${chalk.blue.underline(this.urlWithProjectName)} in your browser`)

    // Step 3
    this.log.local('')
    this.log.local(chalk.dim(`▼ step 3: enter ${this.vaultFilename} identifier`))

    // Step 3 check - when .env.vault already exists with value
    if (this.vaultValue.length === 68) {
      this.abortWithAlreadyExistingVault()
    }

    const dotenvProject = await CliUx.ux.prompt(`${chalk.dim(this.log.pretext)}What is your ${this.vaultFilename} identifier? ${this.vaultKey}=`, {type: 'mask'})
    if (this.invalidIdentifier(dotenvProject)) {
      this.abortWithInvalidIdentifier()
    }

    this._logWritingEnvVault()
    writeFileSync(this.vaultFilename, `${this.vaultKey}=${dotenvProject}`)
    this._logCompleted()
  }

  abortWithInvalidIdentifier(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)

    this.cmd.error(`Invalid ${this.vaultFilename} identifier.`, {
      code: 'IDENTIFIER_ERR',
      ref: '',
      suggestions: [`Generate vault identifiers at ${this.url}`],
    })
  }

  abortWithAlreadyExistingVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)

    this.cmd.error(`Invalid ${this.vaultFilename} identifier.`, {
      code: 'IDENTIFIER_EXISTS',
      ref: '',
      suggestions: [`Identifier already exists for this project. To override it, delete ${this.vaultFilename} and try again.`],
    })
  }

  validIdentifier(identifier: string | any): boolean {
    return identifier && identifier.length === 68
  }

  invalidIdentifier(identifier: string | any): boolean {
    return !this.validIdentifier(identifier)
  }

  _logWritingEnvVault(): void {
    this.log.local(chalk.green(`Added successfully to ${this.vaultFilename}`))
    this.log.local('')
  }

  _writeEnv(): void {
    writeFileSync('.env', 'HELLO=world')
  }

  _writeEnvVault(): void {
    writeFileSync(this.vaultFilename, `${this.vaultKey}= # Generate vault identifiers at ${this.url}`)
  }

  _logCompleted(): void {
    this.cmd.log(`${chalk.green('✓')} Done.`)
    this.cmd.log('')
    this.cmd.log(`Next, commit ${this.vaultFilename} to git and run npx dotenv-vault push`)
    this.cmd.log('')
    this.cmd.log(`    $ git add ${this.vaultFilename} .gitignore`)
    this.cmd.log(`    $ git commit -am 'Add ${this.vaultFilename}'`)
    this.cmd.log('    $ npx dotenv-vault push')
  }
}

export {NewService}
