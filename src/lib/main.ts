import * as dotenv from 'dotenv'
import crypto from 'crypto'
import path from 'path'
import {existsSync} from 'fs'

function _dotenvKey(): string {
  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
    return process.env.DOTENV_KEY
  }

  return ''
}

function _dotenvEnvironment(): string {
  if (process.env.DOTENV_ENVIRONMENT && process.env.DOTENV_ENVIRONMENT.length > 0) {
    return process.env.DOTENV_ENVIRONMENT
  }

  return ''
}

function _decrypt(encrypted: string): string {
  if (_dotenvKey().length === 0) {
    throw new Error('NOT_FOUND_DOTENV_KEY: Cannot find process.env.DOTENV_KEY (suggestion: make sure it is set)')
  }

  const key = Buffer.from(_dotenvKey().slice(-64), 'hex')
  let ciphertext = Buffer.from(encrypted, 'base64')

  const nonce = ciphertext.slice(0, 12)
  const authTag = ciphertext.slice(-16)
  ciphertext = ciphertext.slice(12, -16)

  try {
    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)
    aesgcm.setAuthTag(authTag)
    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`
  } catch (error) {
    const isRange = error instanceof RangeError
    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'

    if (isRange) {
      const msg = 'INVALID_DOTENV_KEY: It must be 64 characters long (or more)'
      throw new Error(msg)
    } else if (decryptionFailed) {
      const msg = 'DECRYPTION_FAILED: Please check your DOTENV_KEY'
      throw new Error(msg)
    } else {
      throw error
    }
  }
}

// Beta feature. Reach out at support@dotenv.org
function config(options?: Record<string, string>): any {
  // fallback to original dotenv if neither is set
  if (_dotenvKey().length === 0 && _dotenvEnvironment().length === 0) {
    return dotenv.config(options) // fallback to .env
  }

  // if one is set but not the other, warn the developer
  if (_dotenvKey().length === 0) {
    throw new Error('NOT_FOUND_DOTENV_KEY: Cannot find process.env.DOTENV_KEY')
  }

  if (_dotenvEnvironment().length === 0) {
    throw new Error('NOT_FOUND_DOTENV_ENVIRONMENT: Cannot find process.env.DOTENV_ENVIRONMENT')
  }

  // Locate .env
  let dotenvPath = path.resolve(process.cwd(), '.env')
  if (options && options.path && options.path.length > 0) {
    dotenvPath = options.path
  }

  // Locate suspected .env.vault
  const vaultPath = `${dotenvPath}.vault`
  if (!existsSync(vaultPath)) {
    throw new Error(`NOT_FOUND_DOTENV_VAULT: Cannot find .env.vault at ${vaultPath}`)
  }

  // Parse .env.vault
  const result = dotenv.config({path: vaultPath})
  if (!result.parsed) {
    throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)
  }

  // Get ciphertext payload
  const ciphertext = result.parsed[`DOTENV_VAULT_${_dotenvEnvironment().toUpperCase()}`] // DOTENV_VAULT_PRODUCTION

  // Decrypt payload
  const decrypted = _decrypt(ciphertext)

  // Parse decrypted .env string
  const parsed = dotenv.parse(decrypted)

  // Set process.env
  for (const key in Object.keys(parsed)) {
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = parsed[key]
    }
  }

  return {parsed}
}

export {config}

