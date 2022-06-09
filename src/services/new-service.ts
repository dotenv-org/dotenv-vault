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
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

interface NewServiceAttrs {
  cmd;
  dotenvProject;
}

class NewService {
  public cmd;
  public dotenvProject;
  public log;
  public requestUid;
  public controller;
  public abort;
  public checkCount;

  constructor(attrs: NewServiceAttrs = {} as NewServiceAttrs) {
    this.cmd = attrs.cmd
    this.dotenvProject = attrs.dotenvProject
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
      writeFileSync(vars.vaultFilename, `${vars.vaultKey}= # Generate vault identifiers at ${this.url}`)
    }

    // Step 2 B
    if (this.dotenvProject) {
      if (vars.invalidVaultValue(this.dotenvProject)) {
        this.abort.invalidEnvVault()
      }

      CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Adding ${vars.vaultFilename} (${vars.vaultKey})`)
      await CliUx.ux.wait(1000)
      CliUx.ux.action.stop()
      writeFileSync(vars.vaultFilename, `${vars.vaultKey}=${this.dotenvProject}`)
      this.log.local(`Added to ${vars.vaultFilename} (${vars.vaultKey}=${this.dotenvProject.slice(0, 9)}...)`)
      this.log.plain('')
      this.log.plain(`Next run ${chalk.bold('npx dotenv-vault@latest login')}`)

      return
    }

    if (vars.existingVaultValue) {
      this.abort.existingEnvVault()
    }

    this.log.local(`Opening browser to ${this.urlWithProjectName}`)
    CliUx.ux.open(this.urlWithProjectName).catch(_ => {})
    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Waiting for project to be created`)
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
        writeFileSync(vars.vaultFilename, `${vars.vaultKey}=${vaultUid}`)
        this.log.local(`Added to ${vars.vaultFilename} (${vars.vaultKey}=${vaultUid.slice(0, 9)}...)`)
        this.log.plain('')
        this.log.plain(`Next run ${chalk.bold('npx dotenv-vault@latest login')}`)
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
