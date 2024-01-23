import {Command} from '@oclif/core'

import {LocalBuildService} from '../../services/local/build-service'

export default class LocalBuild extends Command {
  static description = '[DEPRECATED][Switch to dotenvx: github.com/dotenvx/dotenvx] Build .env.vault from local only'

  public async run(): Promise<void> {
    await new LocalBuildService({cmd: this}).run()
  }
}
