import * as crypto from 'crypto'
import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {CliUx} from '@oclif/core'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

interface LogoutServiceAttrs {
  cmd;
  yes;
}

class LogoutService {
  public cmd;
  public yes;
  public log;
  public requestUid;
  public controller;
  public abort;
  public checkCount;

  constructor(attrs: LogoutServiceAttrs = {} as LogoutServiceAttrs) {
    this.cmd = attrs.cmd
    this.yes = attrs.yes
    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})

    const rand = crypto.randomBytes(32).toString('hex')
    this.requestUid = `req_${rand}`
    this.checkCount = 0
  }

  async run(): Promise<void> {
    await this.logout()
  }

  async logout(tip = true): Promise<void> {
    if (!this.yes) {
      const answer = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Press ${chalk.green('y')} (or any key) to logout and revoke credential (.env.me) or ${chalk.yellow('q')} to exit`)
      if (answer === 'q' || answer === 'Q') {
        this.abort.quit()
      }
    }

    this.log.local(`Opening browser to ${this.logoutUrl}`)
    CliUx.ux.open(this.logoutUrl).catch(_ => {})
    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Waiting for logout and credential (.env.me) to be revoked`)
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
        this.log.local(`Revoked .env.me (DOTENV_ME=${meUid.slice(0, 9)}...)`)
        if (tip) {
          this.log.plain('')
          this.log.plain(`Run ${chalk.bold('npx dotenv-vault@latest login')} to generate a new credential (.env.me)`)
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

  get logoutUrl(): string {
    return `${vars.apiUrl}/logout?DOTENV_VAULT=${vars.vaultValue}&requestUid=${this.requestUid}`
  }

  get checkUrl(): string {
    return `${vars.apiUrl}/check?DOTENV_VAULT=${vars.vaultValue}&requestUid=${this.requestUid}`
  }
}

export {LogoutService}
