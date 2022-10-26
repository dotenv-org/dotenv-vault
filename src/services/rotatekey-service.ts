import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {CliUx} from '@oclif/core'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'
import {LoginService} from '../services/login-service'

interface RotatekeyServiceAttrs {
  cmd;
  environment;
  dotenvMe;
  yes;
}

class RotatekeyService {
  public cmd;
  public environment;
  public dotenvMe;
  public yes;
  public log;
  public abort;
  public login;

  constructor(attrs: RotatekeyServiceAttrs = {} as RotatekeyServiceAttrs) {
    this.cmd = attrs.cmd
    this.environment = attrs.environment
    this.dotenvMe = attrs.dotenvMe
    this.yes = attrs.yes

    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
    this.login = new LoginService({cmd: attrs.cmd, dotenvMe: null, yes: this.yes})
  }

  async run(): Promise<void> {
    if (vars.missingEnvVault) {
      this.abort.missingEnvVault()
    }

    if (vars.emptyEnvVault) {
      this.abort.emptyEnvVault()
    }

    if (vars.missingEnvMe(this.dotenvMe)) {
      await this.login.login(false)
    }

    if (vars.emptyEnvMe(this.dotenvMe)) {
      await this.login.login(false)
    }

    const rotatekeyMsg = 'Rotating decryption key'

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}${rotatekeyMsg}`)
    await this.rotatekey()
  }

  async rotatekey(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        DOTENV_VAULT: vars.vaultValue,
        DOTENV_ME: this.meUid,
        environment: this.environment,
      },
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const keys = resp.data.data.keys

      CliUx.ux.action.stop()

      this.log.plain(keys[0].key) // todo log instructions to help with what you do after setting
      this.log.plain('')
      this.log.plain(`1. Set ${chalk.bold('DOTENV_KEY2')} on your infrastructure`)
    } catch (error) {
      CliUx.ux.action.stop('aborting')
      let errorMessage = null
      let errorCode = 'ROTATEKEY_ERROR'
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
    return vars.apiUrl + '/rotatekey'
  }

  get meUid(): any {
    return this.dotenvMe || vars.meValue
  }
}

export {RotatekeyService}
