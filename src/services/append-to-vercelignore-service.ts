import {existsSync, writeFileSync, readFileSync, appendFileSync} from 'fs'

class AppendToVercelignoreService {
  get vercelignore(): string {
    return '.vercelignore'
  }

  get envFormat(): string {
    return '.env*' // asterisk
  }

  get flaskenvFormat(): string {
    return '.flaskenv*'
  }

  get envProjectFormat(): string {
    return '!.env.project'
  }

  get envVaultFormat(): string {
    return '!.env.vault'
  }

  missing(): boolean {
    return !existsSync(this.vercelignore)
  }

  append(str: string): void {
    appendFileSync(this.vercelignore, str)
  }

  touch(): void {
    writeFileSync(this.vercelignore, '')
  }

  read(): string {
    return readFileSync(this.vercelignore, 'utf8')
  }

  async run(): Promise<void> {
    let envExists = false
    let flaskenvExists = false
    let envProjectExists = false
    let envVaultExists = false

    if (this.missing()) {
      // ignore. must not be a vercel project
    } else {
      // 2. iterate over vercelignore lines
      const lines = this.read().split(/\r?\n/)

      // 3. for each line check if ignore already exists
      for (const line of lines) {
        const trimLine = line.trim()

        if (trimLine === this.envFormat) {
          envExists = true
        }

        if (trimLine === this.flaskenvFormat) {
          flaskenvExists = true
        }

        if (trimLine === this.envProjectFormat) {
          envProjectExists = true
        }

        if (trimLine === this.envVaultFormat) {
          envVaultExists = true
        }
      }

      // 4. add ignore if it does not already exist
      if (envExists === false) {
        this.append('\n' + this.envFormat)
      }

      if (flaskenvExists === false) {
        this.append('\n' + this.flaskenvFormat)
      }

      if (envProjectExists === false) {
        this.append('\n' + this.envProjectFormat)
      }

      if (envVaultExists === false) {
        this.append('\n' + this.envVaultFormat)
      }
    }
  }
}

export {AppendToVercelignoreService}
