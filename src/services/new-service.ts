import chalk from 'chalk'
import {vars} from '../vars'
import {writeFileSync} from 'node:fs'
import {CliUx} from '@oclif/core'
import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {LogService} from '../services/log-service'
import {AbortService} from '../services/abort-service'

interface NewServiceAttrs {
  cmd;
  dotenvProject;
}

class NewService {
  public cmd;
  public dotenvProject;
  public log;
  public abort;

  constructor(attrs: NewServiceAttrs = {} as NewServiceAttrs) {
    this.cmd = attrs.cmd
    this.dotenvProject = attrs.dotenvProject
    this.log = new LogService({cmd: attrs.cmd})
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    new AppendToDockerignoreService().run()
    new AppendToGitignoreService().run()
    new AppendToNpmignoreService().run()

    // Step 1
    if (vars.missingEnvVault) {
      writeFileSync(vars.vaultFilename, `${vars.vaultKey}= # Generate vault identifiers at ${this.url}`)
    }

    // Step 2 B
    if (this.dotenvProject) {
      if (vars.invalidVaultValue(this.dotenvProject)) {
        this.abort.invalidEnvVault()
      }

      CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Adding ${vars.vaultFilename} (${vars.vaultKey})`)
      await CliUx.ux.wait(1000)
      CliUx.ux.action.stop()
      writeFileSync(vars.vaultFilename, `${vars.vaultKey}=${this.dotenvProject}`)
      this.log.local(`Added to .env.project (${vars.vaultKey}=${this.dotenvProject.slice(0, 9)}...)`)
      this.log.plain('')
      this.log.plain(`Next run ${chalk.bold('npx dotenv-vault@latest login')}`)

      return
    }

    if (vars.existingVaultValue) {
      this.abort.existingEnvVault()
    }

    CliUx.ux.open(this.urlWithProjectName)
    const dotenvProject = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Enter the ${vars.vaultFilename} identifier? ${vars.vaultKey}=`)
    if (vars.invalidVaultValue(dotenvProject)) {
      this.abort.invalidEnvVault()
    }

    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Adding ${vars.vaultFilename} (${vars.vaultKey})`)
    await CliUx.ux.wait(1000)
    CliUx.ux.action.stop()
    writeFileSync(vars.vaultFilename, `${vars.vaultKey}=${dotenvProject}`)
    this.log.local(`Added to .env.project (${vars.vaultKey}=${dotenvProject.slice(0, 9)}...)`)
    this.log.plain('')
    this.log.plain(`Next run ${chalk.bold('npx dotenv-vault@latest login')}`)

    writeFileSync(vars.vaultFilename, `${vars.vaultKey}=${dotenvProject}`)
  }

  get url(): string {
    return vars.apiUrl + '/new'
  }

  get urlWithProjectName(): string {
    const dir = process.cwd()
    const splitDir = dir.split('\\').join('/').split('/') // handle windows and unix paths
    const projectName = splitDir[splitDir.length - 1]

    return `${this.url}?project_name=${projectName}`
  }
}

export {NewService}
