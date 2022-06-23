import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {CliUx} from '@oclif/core'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface WhoamiServiceAttrs {
  cmd;
  dotenvMe;
}

class WhoamiService {
  public cmd;
  public dotenvMe;
  public log;
  public abort;

  constructor(attrs: WhoamiServiceAttrs = {} as WhoamiServiceAttrs) {
    this.cmd = attrs.cmd
    this.dotenvMe = attrs.dotenvMe

    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (vars.missingEnvVault) {
      this.abort.missingEnvVault()
    }

    if (vars.emptyEnvVault) {
      this.abort.emptyEnvVault()
    }

    if (vars.missingEnvMe(this.dotenvMe)) {
      this.abort.missingEnvMe()
    }

    if (vars.emptyEnvMe(this.dotenvMe)) {
      this.abort.emptyEnvMe()
    }

    this.whoami()
  }

  async whoami(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        DOTENV_ME: this.meUid,
        DOTENV_VAULT: vars.vaultValue,
      },
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const email = resp.data.data.email
      this.log.plain(email)
    } catch (error) {
      CliUx.ux.action.stop('aborting')
      let errorMessage = null
      let errorCode = 'WHOAMI_ERROR'
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

      this.log.plain(`${chalk.red('x')} Aborted.`)
      this.cmd.error(errorMessage, {
        code: errorCode,
        ref: '',
        suggestions: suggestions,
      })
    }
  }

  get url(): string {
    return vars.apiUrl + '/whoami'
  }

  get meUid(): any {
    return this.dotenvMe || vars.meValue
  }
}

export {WhoamiService}
