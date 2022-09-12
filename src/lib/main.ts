import * as dotenv from 'dotenv'
import Cryptr from 'cryptr'
import path from 'path'
import {existsSync} from 'fs'

function _dotenvEnvironment(): string {
  if (process.env.DOTENV_ENVIRONMENT && process.env.DOTENV_ENVIRONMENT.length > 0) {
    return process.env.DOTENV_ENVIRONMENT
  }

  return ''
}

function _decrypt(encrypted: string): string {
  const decrypter = new Cryptr(process.env.DOTENV_ET)

  try {
    return decrypter.decrypt(encrypted)
  } catch {
    throw new Error('Decryption failed. Check your DOTENV_ENVIRONMENT, DOTENV_ET, and DOTENV_VAULT_DEVELOPMENT values')
  }
}

function config(options?: Record<string, string>): any {
  // 1. Locate .env
  let dotenvPath = path.resolve(process.cwd(), '.env')
  if (options && options.path && options.path.length > 0) {
    dotenvPath = options.path
  }

  // 2. Locate suspected .env.vault
  const vaultPath = `${dotenvPath}.vault`

  // 3. If exists and DOTENV_ENVIRONMENT set, then continue
  if (existsSync(vaultPath) && _dotenvEnvironment().length > 0) {
    // 4. Get .env.vault keys
    const result = dotenv.config({path: vaultPath})

    if (result.parsed) {
      // 5. Get appropriate encrypted payload
      const encrypted = result.parsed[`DOTENV_VAULT_${_dotenvEnvironment().toUpperCase()}`] // DOTENV_VAULT_PRODUCTION

      // 6. Decrypt payload
      const decrypted = _decrypt(encrypted)

      // 7. Parse decrypted .env string
      const parsed = dotenv.parse(decrypted)

      // 8. Set them on process.env
      for (const key in Object.keys(parsed)) {
        if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
          process.env[key] = parsed[key]
        }
      }

      return {parsed}
    }

    return result
  }

  return dotenv.config(options) // fallback to .env
}

export {config}

