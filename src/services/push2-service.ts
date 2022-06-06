import * as dotenv from 'dotenv'
import * as crypto from 'node:crypto'
import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {existsSync, writeFileSync, readFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'

interface Push2ServiceAttrs {
  cmd;
  filename;
  environment;
  dotenvMe;
}

class Push2Service {
  public cmd;
  public environment;
  public filename;
  public dotenvMe;
  public generatedMeUid;
  public log;

  constructor(attrs: Push2ServiceAttrs = {} as Push2ServiceAttrs) {
    this.cmd = attrs.cmd
    this.environment = attrs.environment
    this.filename = attrs.filename
    this.dotenvMe = attrs.dotenvMe

    const rand = crypto.randomBytes(32).toString('hex')
    this.generatedMeUid = `me_${rand}` // only for use on auth call
    this.log = new LogService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    this.log.local(chalk.dim('⬢ dotenv-vault push2'))

    new AppendToDockerignoreService().run()
    new AppendToGitignoreService().run()
    new AppendToNpmignoreService().run()

    // Step 1
    this.log.local('')
    this.log.local(chalk.dim('▼ step 1: check for files'))

    if (this.existingEnv) {
      this.log.local(`${this.smartFilename} ${chalk.dim('(exists)')}`)
    } else {
      this.log.local(`${this.smartFilename} ${chalk.red('(missing)')}`)
      this.abortWithMissingEnv()
    }

    if (this.emptyEnv) {
      this.abortWithEmptyEnv()
    }

    if (this.existingEnvVault) {
      this.log.local(`${vars.vaultFilename} ${chalk.dim('(exists)')}`)
    } else {
      this.log.local(`${vars.vaultFilename} ${chalk.red('(missing)')}`)
      this.abortWithMissingEnvVault()
    }

    if (this.emptyEnvVault) {
      this.abortWithEmptyEnvVault()
    }

    if (this.existingEnvMe) {
      console.log('IMPLEMENT')
    } else {
      CliUx.ux.open('https://duckduckgo.com')
    }

    // this._logCheckingForEnvMe()
    // if (this.existingEnvMe) {
    //   // edge case
    //   if (this.emptyEnvMe) {
    //     this._logEmptyEnvMe()
    //   } else {
    //     // push
    //     await this._push()
    //   }
    // } else {
    //   // first time auth process
    //   await this._authEnvMe()
    // }
  }

  abortWithMissingEnvVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Missing ${vars.vaultFilename} identifier.`, {
      code: 'MISSING_ENV_VAULT',
      ref: '',
      suggestions: [`You must have a ${vars.vaultFilename} file. Try running npx dotenv-vault new`],
    })
  }

  abortWithEmptyEnvVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Empty ${vars.vaultFilename} identifier.`, {
      code: 'EMPTY_ENV_VAULT',
      ref: '',
      suggestions: [`You must have ${vars.vaultKey} set to some value in your ${vars.vaultFilename} file. Try deleting your ${vars.vaultFilename} file and running npx dotenv-vault new`],
    })
  }

  abortWithMissingEnv(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error('Missing .env', {
      code: 'MISSING_ENV',
      ref: '',
      suggestions: [`You must have a ${this.smartFilename} file. Maybe you meant to run npx dotenv-vault pull`],
    })
  }

  abortWithEmptyEnv(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Empty ${this.smartFilename}.`, {
      code: 'EMPTY_ENV',
      ref: '',
      suggestions: [`Your ${this.smartFilename} file is empty. Populate it with value(s).`],
    })
  }

  get existingEnvVault(): boolean {
    return existsSync(vars.vaultFilename)
  }

  get url(): string {
    return vars.apiUrl + '/push'
  }

  get authUrl(): string {
    return vars.apiUrl + '/auth'
  }

  get verifyUrl(): string {
    return vars.apiUrl + '/verify'
  }

  get existingEnvProject(): boolean {
    return existsSync('.env.project')
  }

  get emptyEnvVault(): boolean {
    return !(this.projectUid && this.projectUid.toString().length > 1)
  }

  get envContent(): string {
    return readFileSync(this.smartFilename, 'utf8')
  }

  get emptyEnv(): boolean {
    return !(this.envContent && this.envContent.toString().length > 1)
  }

  get emptyEnvMe(): boolean {
    return !(this.meUid && this.meUid.toString().length > 1)
  }

  get existingEnv(): boolean {
    return existsSync(this.smartFilename)
  }

  get existingEnvMe(): boolean {
    if (this.dotenvMe) {
      return true
    }

    return existsSync('.env.me')
  }

  get smartEnvironment(): any {
    // 1. if user has set an environment for input then use that
    if (this.environment) {
      return this.environment
    }

    return null // otherwise, do not pass environment. dotenv-vault's api will smartly choose the main environment for the project (in most cases development)
  }

  get smartFilename(): string {
    // if user has set a filename for input then use that
    if (this.filename) {
      return this.filename
    }

    if (this.smartEnvironment) {
      // in case of development being passed return .env. 99% of the time development is associated with the .env file
      if (this.smartEnvironment === 'development') {
        return '.env'
      }

      return `.env.${this.smartEnvironment}`
    }

    return '.env'
  }

  get envProjectConfig(): any {
    return dotenv.config({path: '.env.project'}).parsed || {}
  }

  get envMeConfig(): any {
    return dotenv.config({path: '.env.me'}).parsed || {}
  }

  get projectUid(): any {
    return this.envProjectConfig.DOTENV_PROJECT
  }

  get meUid(): any {
    return this.dotenvMe || this.envMeConfig.DOTENV_ME
  }

  async _createEnvMe(): Promise<void> {
    writeFileSync('.env.me', `DOTENV_ME=${this.generatedMeUid}`)
  }

  async _authEnvMe(): Promise<void> {
    this.cmd.log('local:    Generating .env.me credential')
    this._logProTip()

    const email = await CliUx.ux.prompt('What is your email address?', {type: 'mask'})

    this.cmd.log('remote:   Securely sending a code')

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        email: email,
        projectUid: this.projectUid,
        meUid: this.generatedMeUid,
      },
      url: this.authUrl,
    }

    // submit email for identification
    try {
      await axios(options)
      this.cmd.log('remote:   Sent. Check your email.')
      this._createEnvMe()
      this._promptForShortCode()
    } catch (error) {
      this._logError(error)
    }
  }

  async _promptForShortCode(): Promise<void> {
    const shortCode = await CliUx.ux.prompt('What is the code?')

    this.cmd.log('remote:   Verifying')

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        shortCode: shortCode,
        projectUid: this.projectUid,
        meUid: this.meUid,
      },
      url: this.verifyUrl,
    }

    try {
      await axios(options)
      this.cmd.log('remote:   Verified successfully')
      this._push()
    } catch (error) {
      this._logError(error)
    }
  }

  async _push(): Promise<void> {
    this.cmd.log('remote:   ')

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        environment: this.smartEnvironment,
        projectUid: this.projectUid,
        meUid: this.meUid,
        dotenv: this.envContent,
      },
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const environment = resp.data.data.environment
      const envName = resp.data.data.envName

      const outputFilename = this._displayFilename(envName)

      this.cmd.log(`remote:   Securely pushing ${environment} (${outputFilename})`)
      this.cmd.log('remote:   ')

      this._logCompleted()
    } catch (error) {
      this._logError(error)
    }
  }

  _displayFilename(envName: string): string {
    // if user has set a filename for output then use that else use envName
    if (this.filename) {
      return this.filename
    }

    return envName
  }

  _logCompleted(): void {
    this.cmd.log('Done.')
    this.cmd.log('')
  }

  _logEmptyEnvMe(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log('You must have DOTENV_ME set to some value in your .env.me file. Try deleting your .env.me file and running npx dotenv-vault push')
  }

  _logError(error: Record<string, unknown> | Error | any): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    if (error.response) {
      if (error.response.data && error.response.data.errors && error.response.data.errors[0]) {
        this.cmd.log(error.response.data.errors[0].message)
      } else {
        this.cmd.log(error.response.data)
      }
    } else {
      this.cmd.log(error)
    }
  }

  _logProTip(): void {
    this.cmd.log('local:    ')
    this.cmd.log('local:    💡ProTip! The .env.me file securely identifies your machine against this project in Dotenv Vault')
    this.cmd.log('local:    ')
  }
}

export {Push2Service}
