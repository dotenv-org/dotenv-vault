import chalk from 'chalk'

class LogService {
  public cmd;

  constructor(cmd) {
    this.cmd = cmd
  }

  get pretext(): string {
    return 'local:    '
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

    this.cmd.log(`${chalk.dim(this.pretext)}${msg}`)
  }
}

export {LogService}
