import { existsSync, writeFileSync } from 'fs'
import { CliUx } from '@oclif/core'
import { LogService } from './log-service'
import { AbortService } from './abort-service'
import { PullService } from './pull-service'
import chalk from 'chalk'
import * as dotenv from 'dotenv'

interface ExampleServiceAttrs {
  cmd: any;
  yes: boolean;
  environment?: string;
  filename: string;
  dotenvMe?: string;
}

class ExampleService {
  public cmd: any;
  public fileName?: string;
  public yes: boolean;
  public log: LogService;
  public abort: AbortService;
  public pull: PullService;
  public environment: string;

  constructor(attrs: ExampleServiceAttrs = {} as ExampleServiceAttrs) {
    this.cmd = attrs.cmd
    this.yes = attrs.yes
    this.environment = attrs.environment ?? 'production'
    this.fileName = attrs.filename

    this.log = new LogService({ cmd: attrs.cmd })
    this.abort = new AbortService({ cmd: attrs.cmd })
    this.pull = new PullService({
      cmd: attrs.cmd,
      yes: this.yes,
      environment: this.environment,
      filename: undefined,
      dotenvMe: attrs.dotenvMe
    })
  }

  async run(): Promise<void> {
    CliUx.ux.action.start(`${chalk.dim(this.log.pretextRemote)}Pulling ${this.environment} environment`)

    const outputFile = this.fileName ?? '.env.example'

    // Check if output file exists
    if (existsSync(outputFile) && !this.yes) {
      const overwrite = await CliUx.ux.confirm(`${outputFile} already exists. Overwrite?`)

      if (!overwrite) {
        this.log.plain('Operation cancelled.')
        return
      }
    }

    // Pull environment data
    let envData: string | undefined
    try {
      // Get environment data without writing to file
      envData = await this.pull.run(false)
    } catch (error) {
      CliUx.ux.action.stop('failed')
      this.log.remote(`Failed to pull ${this.environment} environment: ${error.message}`)
      return
    }
    if (!envData) {
      CliUx.ux.action.stop('failed')
      this.log.remote('No data received from pull service')
      return
    }

    // Get keys from the environment data
    const parsed = dotenv.parse(envData)
    const keys = Object.keys(parsed)

    // Generate the example content
    const exampleLines = [`# Example .env file generated from the '${this.environment}' environment`]
    for (const key of keys) {
      exampleLines.push(`${key}=${key.toLowerCase()}`)
    }
    const exampleContent = exampleLines.join('\n')

    // Write example file
    writeFileSync(outputFile, exampleContent)
    this.log.plain(`Generated ${outputFile} successfully with keys from ${this.environment} environment.`)

    CliUx.ux.action.stop()
  }
}

export { ExampleService }
