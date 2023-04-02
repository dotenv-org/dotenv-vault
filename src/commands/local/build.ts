import {Command} from '@oclif/core'

import {LocalBuildService} from '../../services/local/build-service'

export default class LocalBuild extends Command {
  static description = 'Build .env.vault from local only'

  public async run(): Promise<void> {
    await new LocalBuildService({cmd: this}).run()
  }
}
