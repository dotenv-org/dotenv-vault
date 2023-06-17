import {LogService} from '../services/log-service'
import {vars} from '../vars'

import {configDotenv, DotenvConfigOutput, decrypt} from 'dotenv'

interface DecryptServiceAttrs {
  cmd;
  dotenvKey;
}

type InstructionsType = {
  ciphertext: string;
  key: string;
}

class DecryptService {
  public cmd;
  public dotenvKey;
  public log;

  constructor(attrs: DecryptServiceAttrs = {} as DecryptServiceAttrs) {
    this.cmd = attrs.cmd
    this.dotenvKey = attrs.dotenvKey

    this.log = new LogService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    const result = configDotenv({path: this.vaultPath})
    const keys = this.dotenvKey.split(',')
    const length = keys.length

    let decrypted
    for (let i = 0; i < length; i++) {
      try {
        // Get full key
        const key = keys[i].trim()

        // Get instructions for decrypt
        const attrs = this._instructions(result, key)

        // Decrypt
        decrypted = decrypt(attrs.ciphertext, attrs.key)

        break
      } catch (error) {
        // last key
        if (i + 1 >= length) {
          throw error
        }
        // try next key
      }
    }

    this.log.plain(decrypted)
  }

  _instructions(result: DotenvConfigOutput, dotenvKey: string): InstructionsType {
    // Parse DOTENV_KEY. Format is a URI
    const uri = new URL(dotenvKey)

    // Get decrypt key
    const key = uri.password
    if (!key) {
      throw new Error('INVALID_DOTENV_KEY: Missing key part')
    }

    // Get environment
    const environment = uri.searchParams.get('environment')
    if (!environment) {
      throw new Error('INVALID_DOTENV_KEY: Missing environment part')
    }

    // Get ciphertext payload
    const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`
    if (!result.parsed) {
      throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file. Run '${vars.cli} build' to include it.`)
    }

    const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION
    if (!ciphertext) {
      throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file. Run '${vars.cli} build' to include it.`)
    }

    return {ciphertext, key}
  }

  get vaultPath(): string {
    return '.env.vault'
  }
}

export {DecryptService}

