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

interface LoginServiceAttrs {
  cmd;
}

class LoginService {
  public cmd;
  public log;
  public requestUid;
  public controller;
  public abort;
  public checkCount;

  constructor(attrs: LoginServiceAttrs = {} as LoginServiceAttrs) {
    this.cmd = attrs.cmd
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

    await this.login()
  }

  async login(tip = true): Promise<void> {
    CliUx.ux.open(this.loginUrl)
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
        writeFileSync('.env.me', `DOTENV_ME=${meUid}`)
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

  get loginUrl(): string {
    return `${vars.apiUrl}/login?vaultUid=${vars.vaultValue}&requestUid=${this.requestUid}`
  }

  get checkUrl(): string {
    return `${vars.apiUrl}/check?vaultUid=${vars.vaultValue}&requestUid=${this.requestUid}`
  }
}

export {LoginService}
