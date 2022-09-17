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

function decrypt(encrypted: string, keyStr: string): string {
  const key = Buffer.from(keyStr.slice(-64), 'hex')
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

function parseVault(options?: Record<string, string>): any {
  // DOTENV_KEY=development/key_1234
  //
  // Warn the developer unless formatted correctly
  const splitDotenvKey = _dotenvKey().split('/')

  const environment = splitDotenvKey[0]
  if (!environment) {
    throw new Error('INVALID_DOTENV_KEY: Missing environment part')
  }

  const key = splitDotenvKey[1]
  if (!key) {
    throw new Error('INVALID_DOTENV_KEY: Missing key part')
  }

  let dotenvPath = path.resolve(process.cwd(), '.env')
  if (options && options.path && options.path.length > 0) {
    dotenvPath = options.path
  }

  // Locate .env.vault
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
  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`
  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION
  if (!ciphertext) {
    throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment DOTENV_VAULT_${environmentKey} in .env.vault`)
  }

  // Decrypt payload
  const decrypted = decrypt(ciphertext, key)

  // Parse decrypted .env string
  return dotenv.parse(decrypted)
}

function configVault(options?: Record<string, string>): any {
  const parsed = parseVault(options)

  // Set process.env
  for (const key of Object.keys(parsed)) {
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = parsed[key]
    }
  }

  return {parsed}
}

function config(options?: Record<string, string>): any {
  // fallback to original dotenv if DOTENV_KEY is not set
  if (_dotenvKey().length === 0) {
    return dotenv.config(options)
  }

  return configVault(options)
}

export {config}

