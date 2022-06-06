import * as crypto from 'node:crypto'
import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {writeFileSync} from 'node:fs'
import {vars} from '../vars'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'

interface LoginServiceAttrs {
  cmd;
}

class LoginService {
  public log;
  public requestUid;
  public controller;

  constructor(attrs: LoginServiceAttrs = {} as LoginServiceAttrs) {
    this.log = new LogService({cmd: attrs.cmd})

    const rand = crypto.randomBytes(32).toString('hex')
    this.requestUid = `req_${rand}`
  }

  async run(): Promise<void> {
    this.log.local(chalk.dim('⬢ dotenv-vault login'))

    new AppendToDockerignoreService().run()
    new AppendToGitignoreService().run()
    new AppendToNpmignoreService().run()

    // Step 1
    this.log.local('')
    this.log.local(chalk.dim('▼ step 1: open url'))
    this.log.local(`opened ${chalk.blue.underline(this.loginUrl)}`)

    CliUx.ux.open(this.loginUrl)

    // Step 2
    this.log.local('')
    this.log.local(chalk.dim('▼ step 2: wait for login'))

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}waiting for login`)
    this.check()
  }

  async check(): Promise<void> {
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
      resp = await axios(options)
    } catch (error: any) {
      resp = error.response
    } finally {
      if (resp.status < 300) {
        // Step 3
        CliUx.ux.action.stop()
        this.log.local('')
        this.log.local(chalk.dim('▼ step 3: generate .env.me credential'))

        const meUid = resp.data.data.meUid
        writeFileSync('.env.me', `DOTENV_ME=${meUid}`)

        this.log.local(`generated .env.me credential with DOTENV_ME=${meUid.slice(0, 9)}...`)
        this.log.local('')
        this.log.plain(`${chalk.green('✓')} Done.`)
        this.log.plain('')
      } else {
        // 404 - keep trying
        await CliUx.ux.wait(2000) // check every 2 seconds
        this.check() // check again
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
