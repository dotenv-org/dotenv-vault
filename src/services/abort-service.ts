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

  quit(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error('Quit', {
      code: 'QUIT',
      ref: '',
      suggestions: [],
    })
  }

  missingEnvVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Missing ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'MISSING_DOTENV_VAULT',
      ref: '',
      suggestions: [`Missing ${vars.vaultFilename} (${vars.vaultKey}). To create it, run: npx dotenv-vault@latest new`],
    })
  }

  emptyEnvVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Empty ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'EMPTY_DOTENV_VAULT',
      ref: '',
      suggestions: [`Empty ${vars.vaultFilename} (${vars.vaultKey}). To fix it, run: npx dotenv-vault@latest new`],
    })
  }

  invalidEnvVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Invalid ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'INVALID_DOTENV_VAULT',
      ref: '',
      suggestions: [`Invalid ${vars.vaultFilename} (${vars.vaultKey}). To fix it, run: npx dotenv-vault@latest new`],
    })
  }

  existingEnvVault(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Existing ${vars.vaultFilename} (${vars.vaultKey}).`, {
      code: 'EXISTING_DOTENV_VAULT',
      ref: '',
      suggestions: [`Existing ${vars.vaultFilename} (${vars.vaultKey}). To fix it, delete ${vars.vaultFilename} and then run: npx dotenv-vault@latest new`],
    })
  }

  invalidEnvMe(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error('Invalid .env.me (DOTENV_ME).', {
      code: 'INVALID_DOTENV_ME',
      ref: '',
      suggestions: ['Invalid .env.me (DOTENV_ME). To fix it, run: npx dotenv-vault@latest login'],
    })
  }

  missingEnvMe(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error('Missing .env.me (DOTENV_ME).', {
      code: 'MISSING_DOTENV_ME',
      ref: '',
      suggestions: ['Missing .env.me (DOTENV_ME). To create it, run: npx dotenv-vault@latest login'],
    })
  }

  emptyEnvMe(): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error('Empty .env.me (DOTENV_ME).', {
      code: 'EMPTY_DOTENV_ME',
      ref: '',
      suggestions: ['Empty .env.me (DOTENV_ME). To create it, run: npx dotenv-vault@latest login'],
    })
  }

  missingEnv(filename: string | any = '.env'): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Missing ${filename}.`, {
      code: 'MISSING_ENV_FILE',
      ref: '',
      suggestions: [`Missing ${filename}. Create it (touch ${filename}) and then try again. Or run, npx dotenv-vault@latest pull`],
    })
  }

  emptyEnv(filename: string | any = '.env'): void {
    this.log.plain(`${chalk.red('x')} Aborted.`)
    this.cmd.error(`Empty ${filename}.`, {
      code: 'EMPTY_ENV_FILE',
      ref: '',
      suggestions: [`Empty ${filename}. Populate it with values and then try again. Or run, npx dotenv-vault@latest pull`],
    })
  }
}

export {AbortService}
