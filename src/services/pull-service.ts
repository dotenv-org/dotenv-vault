import * as dotenv from 'dotenv'
import chalk from 'chalk'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {vars} from '../vars'
import {writeFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface PullServiceAttrs {
  cmd;
  environment;
  filename;
  dotenvMe;
}

class PullService {
  public cmd;
  public environment;
  public filename;
  public dotenvMe;
  public log;
  public abort;

  constructor(attrs: PullServiceAttrs = {} as PullServiceAttrs) {
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

    // special case for pulling example - no auth needed
    if (this.pullingExample) {
      await this.pull()
      return
    }

    if (vars.missingEnvMe(this.dotenvMe)) {
      this.abort.missingEnvMe()
    }

    if (vars.emptyEnvMe(this.dotenvMe)) {
      this.abort.emptyEnvMe()
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}Securely pulling`)

    await this.pull()
  }

  async pull(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        environment: this.environment,
        projectUid: vars.vaultValue,
        meUid: this.meUid,
      },
      url: this.url,
    }

    try {
      const resp: AxiosResponse = await axios(options)
      const environment = resp.data.data.environment
      const envName = resp.data.data.envName
      const newData = resp.data.data.dotenv
      const outputFilename = this.displayFilename(envName)

      CliUx.ux.action.stop()
      writeFileSync(outputFilename, newData)
      this.log.remote(`Securely pulled ${environment} (${outputFilename})`)
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

      this.log.plain(`${chalk.red('x')} Aborted.`)
      this.cmd.error(errorMessage, {
        code: errorCode,
        ref: '',
        suggestions: suggestions,
      })
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
