import * as crypto from 'crypto'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import {vars} from '../../vars'
import {writeFileSync, readFileSync, readdirSync} from 'fs'
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
    writeFileSync(this.keysName, this.keysData)
    writeFileSync(this.vaultName, this.vaultData)

    CliUx.ux.action.stop()

    this.log.local(`Built ${this.vaultName}`)
    this.log.plain('')
    this.log.plain('Next:')
    this.log.plain(`1. Commit ${this.vaultName} to code`)
    this.log.plain('2. Set DOTENV_KEY on server')
    this.log.plain('3. Deploy your code')
    this.log.plain('')
    this.log.plain(`(Find your DOTENV_KEY in the ${chalk.bold(this.keysName)} file)`)

    CliUx.ux.action.stop()
  }

  get vaultData(): string {
    let s = `${vars.vaultFileHeaderComment}\n`

    for (const file in this.envLookups) {
      if (Object.prototype.hasOwnProperty.call(this.envLookups, file)) {
        const environment = this.envLookups[file]

        const dotenvKey = this.keys[`DOTENV_KEY_${environment.toUpperCase()}`]

        const message = readFileSync(file, 'utf8')
        const key = this._parseEncryptionKeyFromDotenvKey(dotenvKey)
        const ciphertext = this._encrypt(key, message)

        s += `DOTENV_VAULT_${environment.toUpperCase()}="${ciphertext}"\n`
      }
    }

    return s
  }

  get keys(): any {
    const keys = {}
    // grab current .env.keys
    const parsed = (dotenv.configDotenv({path: this.keysName}).parsed || {})

    for (const file in this.envLookups) {
      if (Object.prototype.hasOwnProperty.call(this.envLookups, file)) {
        const environment = this.envLookups[file]
        const key = `DOTENV_KEY_${environment.toUpperCase()}`

        let value = parsed[key]

        // prevent overwriting current .env.keys data
        if (!value || value.length === 0) {
          value = this._generateDotenvKey(environment)
        }

        keys[key] = value
      }
    }

    return keys
  }

  get keysData(): string {
    let keysData = `${vars.keysFileHeaderComment}\n`

    for (const key in this.keys) {
      if (Object.prototype.hasOwnProperty.call(this.keys, key)) {
        const value = this.keys[key]
        keysData += `${key}="${value}"\n`
      }
    }

    return keysData
  }

  get vaultName(): string {
    return '.env.vault'
  }

  get keysName(): string {
    return '.env.keys'
  }

  get envLookups(): any {
    const dir = './'
    const lookups = {}

    const files = readdirSync(dir)
    for (const file of files) {
      // must be a .env* file
      if (!file.startsWith('.env')) {
        continue
      }

      // must not be .env.vault.something, or .env.me.something, etc.
      if (this._reservedEnvFilePath(file)) {
        continue
      }

      // must not end with .previous
      if (file.endsWith('.previous')) {
        continue
      }

      const environment = this._determineLikelyEnvironment(file)

      lookups[file] = environment
    }

    return lookups
  }

  _reservedEnvFilePath(file: string): boolean {
    const reservedEnvFiles = ['.env.vault', '.env.keys', '.env.me']

    let result = false

    for (const reservedFile of reservedEnvFiles) {
      if (file.startsWith(reservedFile)) {
        result = true
      }
    }

    return result
  }

  _determineLikelyEnvironment(file: string): string {
    const splitFile = file.split('.')
    const possibleEnvironment = splitFile[2] // ['', 'env', environment']

    if (!possibleEnvironment || possibleEnvironment.length === 0) {
      return 'development'
    }

    return possibleEnvironment
  }

  _generateDotenvKey(environment: string): string {
    const rand = crypto.randomBytes(32).toString('hex')

    return `dotenv://:key_${rand}@dotenv.local/vault/.env.vault?environment=${environment}`
  }

  _parseEncryptionKeyFromDotenvKey(dotenvKey: string): Buffer {
    // Parse DOTENV_KEY. Format is a URI
    const uri = new URL(dotenvKey)

    // Get decrypt key
    const key = uri.password
    if (!key) {
      throw new Error('INVALID_DOTENV_KEY: Missing key part')
    }

    return Buffer.from(key.slice(-64), 'hex')
  }

  _encrypt(key: Buffer, message: string): string {
    // set up nonce
    const nonce = this._generateNonce()

    // set up cipher
    const cipher = crypto.createCipheriv('aes-256-gcm', key, nonce)

    // generate ciphertext
    let ciphertext = ''
    ciphertext += cipher.update(message, 'utf8', 'hex')
    ciphertext += cipher.final('hex')
    ciphertext += cipher.getAuthTag().toString('hex')

    // prepend nonce
    ciphertext = nonce.toString('hex') + ciphertext

    // base64 encode output
    return Buffer.from(ciphertext, 'hex').toString('base64')
  }

  _generateNonce(): Buffer {
    return crypto.randomBytes(this._nonceBytes())
  }

  _keyBytes(): number {
    return 32
  }

  _authTagBytes(): number {
    return 16
  }

  _nonceBytes(): number {
    return 12
  }
}

export {LocalBuildService}
