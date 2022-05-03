import * as dotenv from 'dotenv'
import * as crypto from 'node:crypto'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {existsSync, writeFileSync, readFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import { AppendToIgnoreService } from '../append-to-ignore-service'

interface PushServiceAttrs {
  cmd;
  filename;
  environment;
  dotenvMe;
}

class PushService {
  public cmd;
  public filename;
  public environment;
  public dotenvMe;
  public generatedMeUid;

  constructor(attrs: PushServiceAttrs = {} as PushServiceAttrs) {
    this.cmd = attrs.cmd
    this.filename = attrs.filename
    this.environment = attrs.environment
    this.dotenvMe = attrs.dotenvMe

    const rand = crypto.randomBytes(32).toString('hex')
    this.generatedMeUid = `me_${rand}` // only for use on auth call
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

  get emptyEnvProject(): boolean {
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

  get smartFilename(): string {
    // if user has set a filename for input then use that
    if (this.filename) {
      return this.filename
    }

    return '.env'
  }

  get smartEnvironment(): string {
    // if user has set an environment for input then use that
    if (this.environment) {
      return this.environment
    }

    return '' // otherwise, do not pass environment. dotenv-vault's api will smartly choose the main environment for the project (in most cases development)
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

  async run(): Promise<void> {
    AppendToIgnoreService.run([".dockerignore", ".gitignore", ".npmignore"])

    this._logCheckingForEnv()
    if (!this.existingEnv) {
      this._logMissingEnv()
      return
    }

    if (this.emptyEnv) {
      this._logEmptyEnv()
      return
    }

    this._logCheckingForEnvProject()
    if (!this.existingEnvProject) {
      this._logMissingEnvProject()
      return
    }

    if (this.emptyEnvProject) {
      this._logEmptyEnvProject()
      return
    }

    this._logCheckingForEnvMe()
    if (this.existingEnvMe) {
      // edge case
      if (this.emptyEnvMe) {
        this._logEmptyEnvMe()
      } else {
        // push
        await this._push()
      }
    } else {
      // first time auth process
      await this._authEnvMe()
    }
  }

  _logCheckingForEnvProject(): void {
    this.cmd.log('local:    Checking for .env.project')
  }

  _logMissingEnvProject(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log('You must have a .env.project identifier first. Try running npx dotenv-vault new')
  }

  _logEmptyEnvProject(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log('You must have DOTENV_PROJECT set to some value in your .env.project file. Try deleting your .env.project file and running npx dotenv-vault new')
  }

  _logEmptyEnv(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log(`Your ${this.smartFilename} file is empty. Please populate it with value(s)`)
  }

  _logCheckingForEnv(): void {
    this.cmd.log('local:    ')
    this.cmd.log(`local:    Checking for ${this.smartFilename}`)
  }

  _logMissingEnv(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log(`You must have a ${this.smartFilename} file. Maybe you meant to run npx doten-vault pull`)
  }

  _logCheckingForEnvMe(): void {
    this.cmd.log('local:    Checking for .env.me')
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
    if (this.smartEnvironment) {
      this.cmd.log(`remote:   Securely pushing ${this.smartFilename} to ${this.smartEnvironment}`)
    } else {
      this.cmd.log(`remote:   Securely pushing ${this.smartFilename}`)
    }

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
      await axios(options)
      this._logCompleted()
    } catch (error) {
      this._logError(error)
    }
  }

  _logCompleted(): void {
    this.cmd.log('Done.')
    this.cmd.log('')
  }

  _logEmptyEnvMe(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log('You must have DOTENV_ME set to some value in your .env.me file. Try deleting your .env.me file and running npx doten-vault push')
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

export {PushService}
