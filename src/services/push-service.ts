import * as dotenv from 'dotenv'
import * as crypto from 'node:crypto'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {existsSync, writeFileSync, readFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'

interface PushServiceAttrs {
  cmd;
  filename;
  dotenvMe;
}

class PushService {
  public cmd;
  public filename;
  public dotenvMe;
  public generatedMeUid;

  constructor(attrs: PushServiceAttrs = {} as PushServiceAttrs) {
    this.cmd = attrs.cmd
    this.filename = attrs.filename
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
    return this.envMeConfig.DOTENV_ME
  }

  async run(): Promise<void> {
    new AppendToGitignoreService().run()

    this._logCheckingForEnv()
    if (!this.existingEnv) {
      this._logMissingEnv()
      this.cmd.exit(1)
    }

    if (this.emptyEnv) {
      this._logEmptyEnv()
      this.cmd.exit(1)
    }

    this._logCheckingForEnvProject()
    if (!this.existingEnvProject) {
      this._logMissingEnvProject()
      this.cmd.exit(1)
    }

    if (this.emptyEnvProject) {
      this._logEmptyEnvProject()
      this.cmd.exit(1)
    }

    this._logCheckingForEnvMe()
    if (this.existingEnvMe) {
      // edge case
      if (this.emptyEnvMe) {
        this._logEmptyEnvMe()
        this.cmd.exit(1)
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
    this.cmd.log('local: Checking for .env.project')
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
    this.cmd.log('local:')
    this.cmd.log(`local: Checking for ${this.smartFilename}`)
  }

  _logMissingEnv(): void {
    this.cmd.log('Aborted.')
    this.cmd.log('')
    this.cmd.log(`You must have a ${this.smartFilename} file. Maybe you meant to run npx doten-vault pull`)
  }

  _logCheckingForEnvMe(): void {
    this.cmd.log('local: Checking for .env.me')
  }

  async _createEnvMe(): Promise<void> {
    writeFileSync('.env.me', `DOTENV_ME=${this.generatedMeUid} # do NOT commit to git`)
  }

  async _authEnvMe(): Promise<void> {
    this.cmd.log('local: Generating .env.me credential')
    this._logProTip()

    const email = await CliUx.ux.prompt('What is your email address?', {type: 'mask'})

    this.cmd.log('remote: Securely sending a code')

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
      this.cmd.log('remote: Sent. Check your email.')
      this._createEnvMe()
      this._promptForShortCode()
    } catch (error) {
      this._logError(error)
    }
  }

  async _promptForShortCode(): Promise<void> {
    const shortCode = await CliUx.ux.prompt('What is the code?')

    this.cmd.log('remote: Verifying')

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
      this.cmd.log('remote: Verified successfully')
      this._push()
    } catch (error) {
      this._logError(error)
    }
  }

  async _push(): Promise<void> {
    this.cmd.log('remote:')
    this.cmd.log(`remote: Securely pushing ${this.smartFilename}`)
    this.cmd.log('remote:')

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
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
    this._logProTipDone()
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

    this.cmd.exit(1)
  }

  _logProTip(): void {
    this.cmd.log('local:')
    this.cmd.log('local: 💡ProTip! The .env.me file securely identifies your machine against this project in Dotenv Vault')
    this.cmd.log('local:')
  }

  _logProTipDone(): void {
    this.cmd.log('💡ProTip! You can add personal environment variables to your .env file by including them after the comment # personal.dotenv.org')
    this.cmd.log('')
    this.cmd.log('    # example .env file')
    this.cmd.log('    HELLO=world')
    this.cmd.log('    KEY=value')
    this.cmd.log('    ')
    this.cmd.log('    # personal.dotenv.org')
    this.cmd.log('    HELLO=universe')
  }
}

export {PushService}
