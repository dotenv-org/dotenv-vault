import * as crypto from 'crypto'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import {writeFileSync, readdirSync} from 'fs'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../../services/append-to-npmignore-service'
import {LogService} from '../../services/log-service'

interface LocalBuildServiceAttrs {
  cmd;
}

class LocalBuildService {
  public cmd;
  public log;
  public abort;

  constructor(attrs: LocalBuildServiceAttrs = {} as LocalBuildServiceAttrs) {
    this.cmd = attrs.cmd

    this.log = new LogService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    new AppendToDockerignoreService().run()
    new AppendToGitignoreService().run()
    new AppendToNpmignoreService().run()

    const buildMsg = 'Building .env.vault from files on your machine'

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}${buildMsg}`)
    await this.build()
  }

  async build(): Promise<void> {
    const vaultName = '.env.vault'

    const vaultData = 'encrypted vault data - implement'

    // 1. get all envFiles
    // 2. get environments from those

    writeFileSync(this.keysName, this.keysData)
    writeFileSync(vaultName, vaultData)

    CliUx.ux.action.stop()

    this.log.local(`Built ${vaultName}`)
    this.log.plain('')
    this.log.plain('Next:')
    this.log.plain(`1. Commit ${vaultName} to code`)
    this.log.plain('2. Set DOTENV_KEY on server')
    this.log.plain('3. Deploy your code')
    this.log.plain('')
    this.log.plain(`(Find your DOTENV_KEY in the ${chalk.bold(this.keysName)} file)`)

    CliUx.ux.action.stop()
  }

  get keysData(): string {
    let keysData = ''

    // 1. get current keysData
    const parsed = (dotenv.config({path: this.keysName}).parsed || {})

    for (const file in this.envLookups) {
      if (this.envLookups.hasOwnProperty(file)) {
        const environment = this.envLookups[file]
        const key = `DOTENV_KEY_${environment.toUpperCase()}`
        let value = parsed[key]
        if (!value || value.length === 0) {
          value = this._generateDotenvKey(environment)
        }

        keysData += `${key}="${value}"\n`
      }
    }

    return keysData
  }

  get keysName(): string {
    return '.env.keys'
  }

  get envLookups(): any {
    const _this = this
    const dir = './'
    const lookups = {}

    const files = readdirSync(dir)
    for (const file of files) {
      // must be a .env* file
      if (!file.startsWith('.env')) {
        continue
      }

      // must not be .env.vault.something, or .env.me.something, etc.
      if (_this._reservedEnvFilePath(file)) {
        continue
      }

      // must not end with .previous
      if (file.endsWith('.previous')) {
        continue
      }

      const environment = _this._determineLikelyEnvironment(file)

      lookups[file] = environment
    }

    return lookups
  }

  _reservedEnvFilePath(file): boolean {
    const reservedEnvFiles = ['.env.vault', '.env.keys', '.env.me']

    let result = false

    for (const reservedFile of reservedEnvFiles) {
      if (file.startsWith(reservedFile)) {
        result = true
      }
    }

    return result
  }

  _determineLikelyEnvironment(file): string {
    const splitFile = file.split('.')
    const possibleEnvironment = splitFile[2] // ['', 'env', environment']

    if (!possibleEnvironment || possibleEnvironment.length === 0) {
      return 'development'
    }

    return possibleEnvironment
  }

  _generateDotenvKey(environment): string {
    const rand = crypto.randomBytes(32).toString('hex')

    return `dotenv://:key_${rand}@dotenv.local/vault/.env.vault?environment=${environment}`
  }
}

export {LocalBuildService}
