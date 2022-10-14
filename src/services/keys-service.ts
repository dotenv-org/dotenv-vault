import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'
import {LoginService} from '../services/login-service'

interface KeysServiceAttrs {
  cmd;
  environment;
  dotenvMe;
  yes;
}

class KeysService {
  public cmd;
  public environment;
  public dotenvMe;
  public yes;
  public log;
  public abort;
  public login;

  constructor(attrs: KeysServiceAttrs = {} as KeysServiceAttrs) {
    this.cmd = attrs.cmd
    this.environment = attrs.environment
    this.dotenvMe = attrs.dotenvMe
    this.yes = attrs.yes

    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
    this.login = new LoginService({cmd: attrs.cmd, dotenvMe: null, yes: this.yes})
  }

  async run(): Promise<void> {
    new AppendToDockerignoreService().run()
    new AppendToGitignoreService().run()
    new AppendToNpmignoreService().run()

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

    const keysMsg = 'Listing .env.vault decryption keys'

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}${keysMsg}`)
    await this.keys()
  }

  async keys(): Promise<void> {
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

      if (this.environment && keys[0]) {
        // if environment was passed and key exists then no truncation
        this.log.plain(keys[0].key)
      } else {
        // note that table truncates on smaller terminal windows
        CliUx.ux.table(keys, {
          environment: {
            header: 'environment',
          },
          key: {
            header: 'DOTENV_KEY',
          },
        })

        this.log.plain('')
        this.log.plain(`Set ${chalk.bold('DOTENV_KEY')} on your infrastructure`)
      }
    } catch (error) {
      CliUx.ux.action.stop('aborting')
      let errorMessage = null
      let errorCode = 'KEYS_ERROR'
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
    return vars.apiUrl + '/keys'
  }

  get meUid(): any {
    return this.dotenvMe || vars.meValue
  }
}

export {KeysService}
