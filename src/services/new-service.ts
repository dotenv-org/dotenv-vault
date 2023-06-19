import * as crypto from 'crypto'
import chalk from 'chalk'
import axios, {AxiosRequestConfig} from 'axios'
import {vars} from '../vars'
import {writeFileSync} from 'fs'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface NewServiceAttrs {
  cmd;
  dotenvVault;
  yes;
}

class NewService {
  public cmd;
  public dotenvVault;
  public yes;
  public log;
  public requestUid;
  public controller;
  public abort;
  public checkCount;

  constructor(attrs: NewServiceAttrs = {} as NewServiceAttrs) {
    this.cmd = attrs.cmd
    this.dotenvVault = attrs.dotenvVault
    this.yes = attrs.yes

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

    // Step 1
    if (vars.missingEnvVault) {
      writeFileSync(vars.vaultFilename, this.vaultFileContent(` # Generate vault identifiers at ${this.url}`))
    }

    // Step 2 B
    if (this.dotenvVault) {
      if (vars.invalidVaultValue(this.dotenvVault)) {
        this.abort.invalidEnvVault()
      }

      CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Adding ${vars.vaultFilename} (${vars.vaultKey})`)
      await CliUx.ux.wait(1000)
      CliUx.ux.action.stop()
      writeFileSync(vars.vaultFilename, this.vaultFileContent(this.dotenvVault))
      this.log.local(`Added to ${vars.vaultFilename} (${vars.vaultKey}=${this.dotenvVault.slice(0, 9)}...)`)
      this.log.plain('')
      this.log.plain(`Next run ${chalk.bold(`${vars.cli} login`)}`)

      return
    }

    if (vars.existingVaultValue) {
      this.abort.existingEnvVault()
    }

    if (!this.yes) {
      this.log.local(`New project URL: ${this.urlWithProjectName}`)
      const answer = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Press ${chalk.green('y')} (or any key) to open up the browser to create a new project vault (.env.vault) or ${chalk.yellow('q')} to exit`)
      if (answer === 'q' || answer === 'Q') {
        this.abort.quit()
      }
    }

    this.log.local(`Opening browser to ${this.urlWithProjectName}`)
    CliUx.ux.open(this.urlWithProjectName).catch(_ => {})
    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Waiting for project vault (.env.vault) to be created`)
    await this.check()
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
        const vaultUid = resp.data.data.vaultUid
        writeFileSync(vars.vaultFilename, this.vaultFileContent(vaultUid))
        this.log.local(`Added to ${vars.vaultFilename} (${vars.vaultKey}=${vaultUid.slice(0, 9)}...)`)
        this.log.plain('')
        this.log.plain(`Next run ${chalk.bold(`${vars.cli} login`)}`)
      } else if (this.checkCount < 50) {
        // 404 - keep trying
        await CliUx.ux.wait(2000) // check every 2 seconds
        await this.check() // check again
      } else {
        CliUx.ux.action.stop('giving up')
        this.log.local('Things were taking too long... gave up. Please try again.')
      }
    }
  }

  vaultFileContent(value: string): string {
    const s = `#/-------------------.env.vault---------------------/
#/         cloud-agnostic vaulting standard         /
#/   [how it works](https://dotenv.org/env-vault)   /
#/--------------------------------------------------/

#
# Hello 👋,
#
# Your environment variables will be encrypted and
# safely stored in this .env.vault file, after you
# run the login, push, and build commands.
#
# Next run: ${vars.cli} login
#
# You can safely commit this file to code.
#
# Enjoy. 🌴
#

#/--------------------settings----------------------/
${vars.vaultKey}="${value}"
DOTENV_API_URL="${vars.apiUrl}"
DOTENV_CLI="${vars.cli}"
`

    return s
  }

  get url(): string {
    return vars.apiUrl + '/new'
  }

  get checkUrl(): string {
    return `${vars.apiUrl}/vault`
  }

  get urlWithProjectName(): string {
    const dir = process.cwd()
    const splitDir = dir.split('\\').join('/').split('/') // handle windows and unix paths
    const projectName = splitDir[splitDir.length - 1]

    return `${this.url}?project_name=${projectName}&request_uid=${this.requestUid}`
  }
}

export {NewService}
