import * as dotenv from 'dotenv'
import {existsSync, readFileSync} from 'node:fs'

export class Vars {
  get apiUrl(): string {
    return process.env.DOTENV_API_URL || 'https://vault.dotenv.org'
  }

  get vaultFilename(): string {
    // if .env.vault file exists use it. otherwise use .env.project
    if (existsSync('.env.vault')) {
      return '.env.vault'
    }

    return '.env.project'
  }

  get vaultKey(): string {
    if (this.vaultFilename === '.env.vault') {
      return 'DOTENV_VAULT'
    }

    return 'DOTENV_PROJECT'
  }

  get vaultValue(): string {
    return (dotenv.config({path: vars.vaultFilename}).parsed || {})[vars.vaultKey]
  }

  get existingEnvVault(): boolean {
    return existsSync(this.vaultFilename)
  }

  get missingEnvVault(): boolean {
    return !existsSync(this.vaultFilename)
  }

  get emptyEnvVault(): boolean {
    return !(this.vaultValue && this.vaultValue.toString().length > 1)
  }

  get existingVaultValue(): boolean {
    return this.vaultValue.toString().length === 68
  }

  invalidVaultValue(identifier: string | any): boolean {
    return !(identifier && identifier.length === 68)
  }

  missingEnvMe(dotenvMe: string | any): boolean {
    if (dotenvMe) { // it's not missing if dotenvMe is passed
      return false
    }

    return !existsSync('.env.me')
  }

  emptyEnvMe(dotenvMe: string | any): boolean {
    if (dotenvMe) {
      return false
    }

    return !(this.meValue && this.meValue.toString().length > 1)
  }

  get meValue(): string {
    return (dotenv.config({path: '.env.me'}).parsed || {}).DOTENV_ME
  }

  missingEnv(filename: string | any = '.env'): boolean {
    return !existsSync(filename)
  }

  emptyEnv(filename: string | any = '.env'): boolean {
    const envContent = readFileSync(filename, 'utf8')

    return !(envContent && envContent.toString().length > 0)
  }
}

export const vars = new Vars()
