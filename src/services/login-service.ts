import * as crypto from 'crypto'
import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {writeFileSync} from 'fs'
import {vars} from '../vars'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

interface LoginServiceAttrs {
  cmd;
  dotenvMe;
}

class LoginService {
  public cmd;
  public dotenvMe;
  public log;
  public requestUid;
  public controller;
  public abort;
  public checkCount;

  constructor(attrs: LoginServiceAttrs = {} as LoginServiceAttrs) {
    this.cmd = attrs.cmd
    this.dotenvMe = attrs.dotenvMe
    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})

    const rand = crypto.randomBytes(32).toString('hex')
    this.requestUid = `req_${rand}`
    this.checkCount = 0
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

    // Step 2 B
    if (this.dotenvMe) {
      if (vars.invalidMeValue(this.dotenvMe)) {
        this.abort.invalidEnvMe()
      }

      CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Adding .env.me (DOTENV_ME)`)
      await CliUx.ux.wait(1000)
      CliUx.ux.action.stop()
      writeFileSync('.env.me', this.meFileContent(this.dotenvMe))
      this.log.local(`Added to .env.me (DOTENV_ME=${this.dotenvMe.slice(0, 9)}...)`)
      this.log.plain('')
      this.log.plain(`Next run ${chalk.bold('npx dotenv-vault@latest pull')} or ${chalk.bold('npx dotenv-vault@latest push')}`)

      return
    }

    await this.login()
  }

  async login(tip = true): Promise<void> {
    const answer = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Press any key to open up the browser to login or ${chalk.yellow('q')} to exit`)
    if (answer === 'q' || answer === 'Q') {
      this.abort.quit()
    }

    this.log.local(`Opening browser to ${this.loginUrl}`)
    CliUx.ux.open(this.loginUrl).catch(_ => {})
    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Waiting for login`)
    await this.check(tip)
  }

  async check(tip = true): Promise<void> {
    if (this.controller) {
      this.controller.abort()
    }

    this.controller = new AbortController()

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        vaultUid: vars.vaultValue,
        requestUid: this.requestUid,
      },
      url: this.checkUrl,
      signal: this.controller.signal,
    }

    let resp
    try {
      this.checkCount += 1
      resp = await axios(options)
    } catch (error: any) {
      resp = error.response
    } finally {
      if (resp.status < 300) {
        // Step 3
        CliUx.ux.action.stop()
        const meUid = resp.data.data.meUid
        writeFileSync('.env.me', this.meFileContent(meUid))
        this.log.local(`Logged in as .env.me (DOTENV_ME=${meUid.slice(0, 9)}...)`)
        if (tip) {
          this.log.plain('')
          this.log.plain(`Next run ${chalk.bold('npx dotenv-vault@latest pull')} or ${chalk.bold('npx dotenv-vault@latest push')}`)
        }
      } else if (this.checkCount < 50) {
        // 404 - keep trying
        await CliUx.ux.wait(2000) // check every 2 seconds
        await this.check(tip) // check again
      } else {
        CliUx.ux.action.stop('giving up')
        this.log.local('Things were taking too long... gave up. Please try again.')
      }
    }
  }

  meFileContent(value: string): string {
    const s = `#################################################################################
#                                                                               #
#    This file uniquely authorizes you against this project in Dotenv Vault.    #
#                 Do NOT commit this file to source control.                    #
#                                                                               #
#                  Generated with 'npx dotenv-vault login'                      #
#                                                                               #
#                  Learn more at https://dotenv.org/env-me                      #
#                                                                               #
#################################################################################

DOTENV_ME=${value}`

    return s
  }

  get loginUrl(): string {
    return `${vars.apiUrl}/login?vaultUid=${vars.vaultValue}&requestUid=${this.requestUid}`
  }

  get checkUrl(): string {
    return `${vars.apiUrl}/check?vaultUid=${vars.vaultValue}&requestUid=${this.requestUid}`
  }
}

export {LoginService}
