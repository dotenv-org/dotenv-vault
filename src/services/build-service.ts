import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {writeFileSync} from 'fs'
import {CliUx} from '@oclif/core'
import {AppendToIgnoreService} from '../services/append-to-ignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'
import {LoginService} from '../services/login-service'

interface BuildServiceAttrs {
  cmd;
  dotenvMe;
  yes;
}

class BuildService {
  public cmd;
  public dotenvMe;
  public yes;
  public log;
  public abort;
  public login;

  constructor(attrs: BuildServiceAttrs = {} as BuildServiceAttrs) {
    this.cmd = attrs.cmd
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

    if (vars.missingEnvMe(this.dotenvMe)) {
      await this.login.login(false)
    }

    if (vars.emptyEnvMe(this.dotenvMe)) {
      await this.login.login(false)
    }

    const buildMsg = 'Securely building .env.vault'

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}${buildMsg}`)
    await this.build()
  }

  async build(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        DOTENV_VAULT: vars.vaultValue,
        DOTENV_ME: this.meUid,
      },
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const envName = resp.data.data.envName
      const newData = resp.data.data.dotenv

      CliUx.ux.action.stop()

      // write to .env.vault
      writeFileSync(envName, newData)
      this.log.remote('Securely built .env.vault')
      this.log.plain('')
      this.log.plain('Next:')
      this.log.plain('1. Commit .env.vault to code')
      this.log.plain('2. Set DOTENV_KEY on server')
      this.log.plain('3. Deploy your code')
      this.log.plain('')
      this.log.plain(`(run ${chalk.bold(`${vars.cli} keys`)} to view DOTENV_KEYs)`)
    } catch (error) {
      CliUx.ux.action.stop('aborting')
      let errorMessage = null
      let errorCode = 'BUILD_ERROR'
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
    return vars.apiUrl + '/build'
  }

  get meUid(): any {
    return this.dotenvMe || vars.meValue
  }
}

export {BuildService}
