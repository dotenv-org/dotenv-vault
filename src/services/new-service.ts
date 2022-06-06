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
      this.log.local(`${vars.vaultFilename} ${chalk.dim('(exists)')}`)
    } else {
      this.log.local(`${vars.vaultFilename} ${chalk.green('(created)')}`)
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
      this.log.local(chalk.dim(`▼ step 3: enter ${vars.vaultFilename} identifier`))
      this.log.local('Adding')

      if (this.invalidIdentifier(this.dotenvProject)) {
        this.abortWithInvalidIdentifier()
      }

      this._logWritingEnvVault()
      writeFileSync(vars.vaultFilename, `${vars.vaultKey}=${this.dotenvProject}`)
      this._logCompleted()
      return
    }

    // Step 2 A
    this.log.local('')
    this.log.local(chalk.dim('▼ step 2: open url'))
    this.log.local(`Open ${chalk.blue.underline(this.urlWithProjectName)} in your browser`)

    // Step 3
    this.log.local('')
    this.log.local(chalk.dim(`▼ step 3: enter ${vars.vaultFilename} identifier`))

    // Step 3 check - when .env.vault already exists with value
    if (this.vaultValue.length === 68) {
      this.abortWithAlreadyExistingVault()
    }

    const dotenvProject = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}What is your ${vars.vaultFilename} identifier? ${vars.vaultKey}=`, {type: 'mask'})
    if (this.invalidIdentifier(dotenvProject)) {
      this.abortWithInvalidIdentifier()
    }

    this._logWritingEnvVault()
    writeFileSync(vars.vaultFilename, `${vars.vaultKey}=${dotenvProject}`)
    this._logCompleted()
  }

  get vaultValue(): string {
    return (dotenv.config({path: vars.vaultFilename}).parsed || {})[vars.vaultKey]
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
    return existsSync(vars.vaultFilename)
  }

  abortWithInvalidIdentifier(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)

    this.cmd.error(`Invalid ${vars.vaultFilename} identifier.`, {
      code: 'IDENTIFIER_ERR',
      ref: '',
      suggestions: [`Generate vault identifiers at ${this.url}`],
    })
  }

  abortWithAlreadyExistingVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)

    this.cmd.error(`Invalid ${vars.vaultFilename} identifier.`, {
      code: 'IDENTIFIER_EXISTS',
      ref: '',
      suggestions: [`Identifier already exists for this project. To override it, delete ${vars.vaultFilename} and try again.`],
    })
  }

  validIdentifier(identifier: string | any): boolean {
    return identifier && identifier.length === 68
  }

  invalidIdentifier(identifier: string | any): boolean {
    return !this.validIdentifier(identifier)
  }

  _logWritingEnvVault(): void {
    this.log.local(chalk.green(`Added successfully to ${vars.vaultFilename}`))
    this.log.local('')
  }

  _writeEnv(): void {
    writeFileSync('.env', 'HELLO=world')
  }

  _writeEnvVault(): void {
    writeFileSync(vars.vaultFilename, `${vars.vaultKey}= # Generate vault identifiers at ${this.url}`)
  }

  _logCompleted(): void {
    this.log.plain(`${chalk.green('✓')} Done.`)
    this.log.plain('')
    this.log.plain(`Next, commit ${vars.vaultFilename} to git and run npx dotenv-vault push`)
    this.log.plain('')
    this.log.plain(`    $ git add ${vars.vaultFilename} .gitignore`)
    this.log.plain(`    $ git commit -am 'Add ${vars.vaultFilename}'`)
    this.log.plain('    $ npx dotenv-vault push')
  }
}

export {NewService}
