import {readFileSync} from 'fs'
import {LogService} from '../services/log-service'

interface DecryptServiceAttrs {
  cmd;
  dotenvKey;
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
    this.log.plain(this.dotenvVaultContents)
  }

  get dotenvVault(): string {
    return '.env.vault'
  }

  get dotenvVaultContents(): string {
    return readFileSync(this.dotenvVault, 'utf8')
  }
}

export {DecryptService}

