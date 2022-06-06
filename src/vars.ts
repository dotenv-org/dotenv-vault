import * as dotenv from 'dotenv'
import {existsSync} from 'node:fs'

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
}

export const vars = new Vars()
