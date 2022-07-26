import chalk from 'chalk'
import {CliUx} from '@oclif/core'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface StatusServiceAttrs {
  cmd;
  yes;
}

class StatusService {
  public cmd;
  public yes;
  public log;
  public abort;

  constructor(attrs: StatusServiceAttrs = {} as StatusServiceAttrs) {
    this.cmd = attrs.cmd
    this.yes = attrs.yes

    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (!this.yes) {
      const answer = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Press ${chalk.green('y')} (or any key) to open up the browser to view the dotenv-vault status page or ${chalk.yellow('q')} to exit`)
      if (answer === 'q' || answer === 'Q') {
        this.abort.quit()
      }
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Opening status page`)
    await CliUx.ux.wait(1000)
    CliUx.ux.action.stop()
    this.log.local(`Opening browser to ${this.statusUrl}`)
    CliUx.ux.open(this.statusUrl).catch(_ => {})
  }

  get statusUrl(): string {
    return 'https://status.dotenv.org'
  }
}

export {StatusService}
