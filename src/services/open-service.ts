import chalk from 'chalk'
import {vars} from '../vars'
import {existsSync} from 'fs'
import {CliUx} from '@oclif/core'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface OpenServiceAttrs {
  cmd;
  environment;
  yes;
}

class OpenService {
  public cmd;
  public environment;
  public yes;
  public log;
  public abort;

  constructor(attrs: OpenServiceAttrs = {} as OpenServiceAttrs) {
    this.cmd = attrs.cmd
    this.environment = attrs.environment
    this.yes = attrs.yes

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

    if (!this.yes) {
      this.log.local(`Project URL: ${this.openUrl}`)
      const answer = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Press ${chalk.green('y')} (or any key) to open up the browser to view your project or ${chalk.yellow('q')} to exit`)
      if (answer === 'q' || answer === 'Q') {
        this.abort.quit()
      }
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Opening project page`)
    await CliUx.ux.wait(1000)
    CliUx.ux.action.stop()
    this.log.local(`Opening browser to ${this.openUrl}`)
    CliUx.ux.open(this.openUrl).catch(_ => {})
    this.log.plain('')
    this.log.plain(`Next run ${chalk.bold(`${vars.cli} ${this.pushOrPullCommand}`)} to ${this.pushOrPullCommand} your .env file`)
  }

  get openUrl(): string {
    return `${vars.apiUrl}/open?DOTENV_VAULT=${vars.vaultValue}&environment=${this.environment}`
  }

  get pushOrPullCommand(): string {
    // tell dev to push if he already has a local .env file
    if (existsSync('.env')) {
      return 'push'
    }

    // otherwise tell him to pull
    return 'pull'
  }
}

export {OpenService}
