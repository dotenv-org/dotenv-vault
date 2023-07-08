import {AppendToDockerignoreService} from '../services/append-to-dockerignore-service'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {AppendToNpmignoreService} from '../services/append-to-npmignore-service'
import {AppendToVercelignoreService} from '../services/append-to-vercelignore-service'

class AppendToIgnoreService {
  async run (): Promise<void> {
    new AppendToDockerignoreService().run()
    new AppendToGitignoreService().run()
    new AppendToNpmignoreService().run()
    new AppendToVercelignoreService().run()
  }
}

export {AppendToIgnoreService}
