import chalk from 'chalk'
import {vars} from '../vars'
import {CliUx} from '@oclif/core'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface OpenServiceAttrs {
  cmd;
}

class OpenService {
  public cmd;
  public log;
  public abort;

  constructor(attrs: OpenServiceAttrs = {} as OpenServiceAttrs) {
    this.cmd = attrs.cmd
    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (vars.missingEnvVault) {
      this.abort.missingEnvVault()
    }

    if (vars.emptyEnvVault) {
      this.abort.emptyEnvVault()
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Opening project page`)
    await CliUx.ux.wait(1000)
    CliUx.ux.action.stop()
    this.log.local(`Opening browser to ${this.openUrl}`)
    CliUx.ux.open(this.openUrl).catch()
  }

  get openUrl(): string {
    return `${vars.apiUrl}/open?vaultUid=${vars.vaultValue}`
  }
}

export {OpenService}
