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
}

export {AbortService}
