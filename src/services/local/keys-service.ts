import chalk from 'chalk'
import * as dotenv from 'dotenv'
import {vars} from '../../vars'
import {CliUx} from '@oclif/core'
import {LogService} from '../../services/log-service'
import {AbortService} from '../../services/abort-service'

interface LocalKeysServiceAttrs {
  cmd;
  environment;
}

class LocalKeysService {
  public cmd;
  public environment;
  public log;
  public abort;

  constructor(attrs: LocalKeysServiceAttrs = {} as LocalKeysServiceAttrs) {
    this.cmd = attrs.cmd
    this.environment = attrs.environment

    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (vars.missingEnvKeys) {
      this.abort.missingEnvKeys()
    }

    if (vars.emptyEnvKeys) {
      this.abort.emptyEnvKeys()
    }

    const keysMsg = 'Listing .env.vault decryption keys from .env.keys'

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}${keysMsg}`)
    await this.keys()
  }

  async keys(): Promise<void> {
    const keys = this.keyRows

    CliUx.ux.action.stop()

    if (this.environment) {
      const environment = this.environment.toLowerCase()

      const result = keys.find(function (row) {
        return row.environment === environment.toLowerCase()
      })

      this.log.plain(result.key)
    } else {
      // note that table truncates on smaller terminal windows
      CliUx.ux.table(keys, {
        environment: {
          header: 'environment',
        },
        key: {
          header: 'DOTENV_KEY',
        },
      })

      this.log.plain('')
      this.log.plain(`Set ${chalk.bold('DOTENV_KEY')} on your server`)
    }
  }

  get keysName(): string {
    return '.env.keys'
  }

  get keyRows(): any {
    // Read and parse from .env.keys
    const parsed = (dotenv.configDotenv({path: this.keysName}).parsed || {})

    const rows: { environment: string; key: string; }[] = []

    for (const parsedKey in parsed) {
      if (Object.prototype.hasOwnProperty.call(parsed, parsedKey)) {
        const key = parsed[parsedKey]
        const environment = parsedKey.replace('DOTENV_KEY_', '').toLowerCase()

        const row = {
          environment: environment,
          key: key,
        }

        rows.push(row)
      }
    }

    return rows
  }
}

export {LocalKeysService}
