import chalk from 'chalk'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {vars} from '../vars'
import {existsSync, renameSync, writeFileSync} from 'fs'
import {CliUx} from '@oclif/core'
import {AppendToIgnoreService} from '../services/append-to-ignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'
import {LoginService} from '../services/login-service'

interface PullServiceAttrs {
  cmd;
  environment;
  filename;
  dotenvMe;
  yes;
}

class PullService {
  public cmd;
  public environment;
  public filename;
  public dotenvMe;
  public yes;
  public log;
  public abort;
  public login;

  constructor(attrs: PullServiceAttrs = {} as PullServiceAttrs) {
    this.cmd = attrs.cmd
    this.environment = attrs.environment
    this.filename = attrs.filename
    this.dotenvMe = attrs.dotenvMe
    this.yes = attrs.yes

    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
    this.login = new LoginService({cmd: attrs.cmd, dotenvMe: null, yes: this.yes})
  }

  async run(): Promise<void> {
    new AppendToIgnoreService().run()

    if (vars.missingEnvVault) {
      this.abort.missingEnvVault()
    }

    if (vars.emptyEnvVault) {
      this.abort.emptyEnvVault()
    }

    // special case for pulling example - no auth needed
    if (this.pullingExample) {
      await this.pull()
      return
    }

    if (vars.missingEnvMe(this.dotenvMe)) {
      await this.login.login(false)
    }

    if (vars.emptyEnvMe(this.dotenvMe)) {
      await this.login.login(false)
    }

    let pullingMsg = 'Securely pulling'
    if (this.environment) {
      pullingMsg = `Securely pulling ${this.environment}`
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}${pullingMsg}`)

    await this.pull()
  }

  async pull(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        environment: this.environment,
        DOTENV_VAULT: vars.vaultValue,
        DOTENV_ME: this.meUid,
      },
      url: this.url,
    }

    try {
      const resp: AxiosResponse = await axios(options)
      const environment = resp.data.data.environment
      const envName = resp.data.data.envName
      const newData = resp.data.data.dotenv
      const newVaultData = resp.data.data.dotenvVault
      const outputFilename = this.displayFilename(envName)

      CliUx.ux.action.stop()

      // backup current file to .previous
      if (existsSync(outputFilename)) {
        renameSync(outputFilename, `${outputFilename}.previous`)
      }

      // write to new current file
      writeFileSync(outputFilename, newData)
      this.log.remote(`Securely pulled ${environment} (${outputFilename})`)
      // write .env.vault file
      if (newVaultData) {
        writeFileSync('.env.vault', newVaultData)
        this.log.remote('Securely built vault (.env.vault)')
      }
    } catch (error) {
      CliUx.ux.action.stop('aborting')
      let errorMessage = null
      let errorCode = 'PULL_ERROR'
      let suggestions = []

      errorMessage = error
      if (error.response) {
        errorMessage = error.response.data
        if (error.response.data && error.response.data.errors && error.response.data.errors[0]) {
          const error1 = error.response.data.errors[0]

          errorMessage = error1.message
          if (error1.code) {
            errorCode = error1.code
          }

          if (error1.suggestions) {
            suggestions = error1.suggestions
          }
        }
      }

      this.abort.error(errorMessage, {code: errorCode, ref: '', suggestions: suggestions})
    }
  }

  get url(): string {
    return vars.apiUrl + '/pull'
  }

  get meUid(): any {
    return this.dotenvMe || vars.meValue
  }

  get pullingExample(): boolean {
    return this.environment === 'example'
  }

  displayFilename(envName: string): string {
    // if user has set a filename for output then use that else use envName
    if (this.filename) {
      return this.filename
    }

    return envName
  }
}

export {PullService}
