import chalk from 'chalk'
import {vars} from '../vars'
import {LogService} from '../services/log-service'

interface AbortServiceAttrs {
  cmd;
}

class AbortService {
  public cmd;
  public log;

  constructor(attrs: AbortServiceAttrs = {} as AbortServiceAttrs) {
    this.cmd = attrs.cmd
    this.log = new LogService({cmd: attrs.cmd})
  }

  error(msg, obj): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)

    if (obj.code) {
      this.code(obj.code)
    }

    if (obj.suggestions[0]) {
      this.suggestion(obj.suggestions[0])
    }

    this.cmd.error(msg)
  }

  code(code): void {
    this.log.plain(`Code: ${code}`)
  }

  suggestion(suggestion): void {
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
      suggestions: [`run npx dotenv-vault@latest new`],
    })
  }

  emptyEnvVault(): void {
    this.error(`Empty ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'EMPTY_DOTENV_VAULT',
      ref: '',
      suggestions: [`run npx dotenv-vault@latest new`],
    })
  }

  invalidEnvVault(): void {
    this.error(`Invalid ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'INVALID_DOTENV_VAULT',
      ref: '',
      suggestions: [`run npx dotenv-vault@latest new`],
    })
  }

  existingEnvVault(): void {
    this.error(`Existing ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'EXISTING_DOTENV_VAULT',
      ref: '',
      suggestions: [`delete ${vars.vaultFilename} and then run npx dotenv-vault@latest new`],
    })
  }

  invalidEnvMe(): void {
    this.error('Invalid .env.me (DOTENV_ME).', {
      code: 'INVALID_DOTENV_ME',
      ref: '',
      suggestions: ['run npx dotenv-vault@latest login'],
    })
  }

  missingEnvMe(): void {
    this.error('Missing .env.me (DOTENV_ME).', {
      code: 'MISSING_DOTENV_ME',
      ref: '',
      suggestions: ['run npx dotenv-vault@latest login'],
    })
  }

  emptyEnvMe(): void {
    this.error('Empty .env.me (DOTENV_ME).', {
      code: 'EMPTY_DOTENV_ME',
      ref: '',
      suggestions: ['run npx dotenv-vault@latest login'],
    })
  }

  missingEnv(filename: string | any = '.env'): void {
    this.error(`Missing ${filename}.`, {
      code: 'MISSING_ENV_FILE',
      ref: '',
      suggestions: [`Create it (touch ${filename}) and then try again. Or run, npx dotenv-vault@latest pull`],
    })
  }

  emptyEnv(filename: string | any = '.env'): void {
    this.error(`Empty ${filename}.`, {
      code: 'EMPTY_ENV_FILE',
      ref: '',
      suggestions: [`Populate ${filename} with values and then try again. Or run, npx dotenv-vault@latest pull`],
    })
  }
}

export {AbortService}
