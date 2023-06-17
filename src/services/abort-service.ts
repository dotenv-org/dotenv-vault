import chalk from 'chalk'
import {vars} from '../vars'
import {LogService} from '../services/log-service'

interface AbortServiceAttrs {
  cmd;
}

interface ErrorInfo {
  code: string;
  suggestions: Array<string>;
  ref: string;
}

class AbortService {
  public cmd;
  public log;

  constructor(attrs: AbortServiceAttrs = {} as AbortServiceAttrs) {
    this.cmd = attrs.cmd
    this.log = new LogService({cmd: attrs.cmd})
  }

  error(msg: string, obj: ErrorInfo): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)

    if (obj.code) {
      this.code(obj.code)
    }

    if (obj.suggestions[0]) {
      this.suggestion(obj.suggestions[0])
    }

    this.cmd.error(msg)
  }

  code(code: string): void {
    this.log.plain(`Code: ${code}`)
  }

  suggestion(suggestion: string): void {
    this.log.plain(`Suggestion: ${suggestion}`)
  }

  quit(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.exit()
  }

  missingEnvVault(): void {
    this.error(`Missing ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'MISSING_DOTENV_VAULT',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} new`)}`],
    })
  }

  emptyEnvVault(): void {
    this.error(`Empty ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'EMPTY_DOTENV_VAULT',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} new`)}`],
    })
  }

  invalidEnvVault(): void {
    this.error(`Invalid ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'INVALID_DOTENV_VAULT',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} new`)}`],
    })
  }

  existingEnvVault(): void {
    this.error(`Existing ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'EXISTING_DOTENV_VAULT',
      ref: '',
      suggestions: [`Delete ${vars.vaultFilename} and then run, ${chalk.bold(`${vars.cli} new`)}`],
    })
  }

  invalidEnvMe(): void {
    this.error('Invalid .env.me (DOTENV_ME).', {
      code: 'INVALID_DOTENV_ME',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} login`)}`],
    })
  }

  missingEnvMe(): void {
    this.error('Missing .env.me (DOTENV_ME).', {
      code: 'MISSING_DOTENV_ME',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} login`)}`],
    })
  }

  emptyEnvMe(): void {
    this.error('Empty .env.me (DOTENV_ME).', {
      code: 'EMPTY_DOTENV_ME',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} login`)}`],
    })
  }

  missingEnv(filename: string | any = '.env'): void {
    this.error(`Missing ${filename}.`, {
      code: 'MISSING_ENV_FILE',
      ref: '',
      suggestions: [`Create it (touch ${filename}) and then try again. Or run, ${chalk.bold(`${vars.cli} pull`)}`],
    })
  }

  emptyEnv(filename: string | any = '.env'): void {
    this.error(`Empty ${filename}.`, {
      code: 'EMPTY_ENV_FILE',
      ref: '',
      suggestions: [`Populate ${filename} with values and then try again. Or run, ${chalk.bold(`${vars.cli} pull`)}`],
    })
  }

  missingEnvKeys(): void {
    this.error('Missing .env.keys file', {
      code: 'MISSING_DOTENV_KEYS',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} local build`)}`],
    })
  }

  emptyEnvKeys(): void {
    this.error('Empty .env.keys file.', {
      code: 'EMPTY_DOTENV_KEYS',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} local build`)}`],
    })
  }
}

export {AbortService}
