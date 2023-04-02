import {Command} from '@oclif/core'

export default class LocalBuild extends Command {
  static description = 'Build .env.vault from local only'

  public async run(): Promise<void> {
    console.log('local build')
  }
}
