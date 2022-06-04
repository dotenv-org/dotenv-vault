import chalk from 'chalk'

interface LogServiceAttrs {
  cmd;
}

class LogService {
  public cmd;

  constructor(attrs: LogServiceAttrs = {} as LogServiceAttrs) {
    this.cmd = attrs.cmd
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
