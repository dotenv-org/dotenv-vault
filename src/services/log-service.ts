import chalk from 'chalk'

interface LogServiceAttrs {
  cmd;
}

class LogService {
  public cmd;

  constructor(attrs: LogServiceAttrs = {} as LogServiceAttrs) {
    this.cmd = attrs.cmd
  }

  get pretextLocal(): string {
    return 'local:    '
  }

  get pretextRemote(): string {
    return 'remote:   '
  }

  deprecated(msg: string): void {
    if (msg === undefined) {
      msg = ''
    }

    this.cmd.log(`${chalk.red('[DEPRECATED] Please switch to dotenvx – github.com/dotenvx/dotenvx ')}${msg}`)
  }

  plain(msg: string): void {
    if (msg === undefined) {
      msg = ''
    }

    this.cmd.log(msg)
  }

  local(msg: string): void {
    if (msg === undefined) {
      msg = ''
    }

    this.cmd.log(`${chalk.dim(this.pretextLocal)}${msg}`)
  }

  remote(msg: string): void {
    if (msg === undefined) {
      msg = ''
    }

    this.cmd.log(`${chalk.dim(this.pretextRemote)}${msg}`)
  }
}

export {LogService}
