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

    if (!this.yes) {
      const answer = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Are you sure you want to rotate your ${this.environment} DOTENV_KEY? Type ${chalk.green('yes')} to continue`)
      if (answer !== 'yes' && answer !== 'YES' && answer !== 'Yes') {
        this.abort.quit()
      }
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
      const DOTENV_KEY = resp.data.data.DOTENV_KEY
      const PREVIOUS_DOTENV_KEY = resp.data.data.PREVIOUS_DOTENV_KEY

      CliUx.ux.action.stop()

      this.log.plain(DOTENV_KEY)
      this.log.plain('')
      this.log.plain('1. Update DOTENV_KEY - comma-append the new value')
      this.log.plain(`2. Rebuild (${vars.cliCommand} build)`)
      this.log.plain('3. Deploy (git push)')
      this.log.plain('4. Update DOTENV_KEY - remove the old value')
      this.log.plain('')
      this.log.plain('Example:')
      this.log.plain(`DOTENV_KEY='${PREVIOUS_DOTENV_KEY},${DOTENV_KEY}'`)
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
