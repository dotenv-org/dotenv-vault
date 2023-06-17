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

interface VersionsServiceAttrs {
  cmd;
  environment;
  dotenvMe;
  yes;
}

class VersionsService {
  public cmd;
  public environment;
  public dotenvMe;
  public yes;
  public log;
  public abort;
  public login;

  constructor(attrs: VersionsServiceAttrs = {} as VersionsServiceAttrs) {
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

    let versionsMsg = 'Listing versions'
    if (this.smartEnvironment) {
      versionsMsg = `Listing ${this.smartEnvironment} versions`
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}${versionsMsg}`)
    await this.versions()
  }

  async versions(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        environment: this.smartEnvironment,
        projectUid: vars.vaultValue,
        meUid: this.meUid,
      },
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const versions = resp.data.data.versions
      const environment = resp.data.data.environment

      CliUx.ux.action.stop()

      CliUx.ux.table(versions, {
        version: {
          header: 'Ver',
          minWidth: 7,
        },
        change: {
          header: 'Change',
        },
        by: {
          header: 'By',
        },
        when: {
          header: 'When',
        },
      })

      this.log.plain('')
      this.log.plain(`Pull a version with ${chalk.bold(`${vars.cli} pull ${environment}@${versions[0].version}`)}`)
    } catch (error) {
      CliUx.ux.action.stop('aborting')
      let errorMessage = null
      let errorCode = 'VERSIONS_ERROR'
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
    return vars.apiUrl + '/versions'
  }

  get smartEnvironment(): any {
    // 1. if user has set an environment for input then use that
    if (this.environment) {
      return this.environment
    }

    return null // otherwise, do not pass environment. dotenv-vault's api will smartly choose the main environment for the project (in most cases development)
  }

  get meUid(): any {
    return this.dotenvMe || vars.meValue
  }
}

export {VersionsService}
