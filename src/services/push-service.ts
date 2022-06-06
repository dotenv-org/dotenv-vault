import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {readFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface PushServiceAttrs {
  cmd;
  environment;
  filename;
  dotenvMe;
}

class PushService {
  public cmd;
  public environment;
  public filename;
  public dotenvMe;
  public log;
  public abort;

  constructor(attrs: PushServiceAttrs = {} as PushServiceAttrs) {
    this.cmd = attrs.cmd
    this.environment = attrs.environment
    this.filename = attrs.filename
    this.dotenvMe = attrs.dotenvMe

    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
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
      this.abort.missingEnvMe()
    }

    if (vars.emptyEnvMe(this.dotenvMe)) {
      this.abort.emptyEnvMe()
    }

    if (vars.missingEnv(this.smartFilename)) {
      this.abort.missingEnv(this.smartFilename)
    }

    if (vars.emptyEnv(this.smartFilename)) {
      this.abort.emptyEnv(this.smartFilename)
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}Securely pushing`)

    this.push()
  }

  async push(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        environment: this.smartEnvironment,
        projectUid: vars.vaultValue,
        meUid: this.meUid,
        dotenv: this.envContent,
      },
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const environment = resp.data.data.environment
      const envName = resp.data.data.envName
      const outputFilename = this.displayFilename(envName)

      CliUx.ux.action.stop()
      this.log.remote(`Securely pushed ${environment} (${outputFilename})`)
    } catch (error) {
      CliUx.ux.action.stop('aborting')
      let errorMessage = null
      let errorCode = 'PUSH_ERROR'
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
    return vars.apiUrl + '/push'
  }

  get envContent(): string {
    return readFileSync(this.smartFilename, 'utf8')
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

  get meUid(): any {
    return this.dotenvMe || vars.meValue
  }

  displayFilename(envName: string): string {
    // if user has set a filename for output then use that else use envName
    if (this.filename) {
      return this.filename
    }

    return envName
  }
}

export {PushService}
