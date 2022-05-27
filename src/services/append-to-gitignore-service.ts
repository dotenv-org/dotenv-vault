import {existsSync, writeFileSync, readFileSync, appendFileSync} from 'node:fs'

class AppendToGitignoreService {
  get gitignore(): string {
    return '.gitignore'
  }

  get envFormat(): string {
    return '.env*' // asterisk
  }

  get envProjectFormat(): string {
    return '!.env.project'
  }

  get envVaultFormat(): string {
    return '!.env.vault'
  }

  missing(): boolean {
    return !existsSync(this.gitignore)
  }

  append(str: string): void {
    appendFileSync(this.gitignore, str)
  }

  touch(): void {
    writeFileSync(this.gitignore, '')
  }

  read(): string {
    return readFileSync(this.gitignore, 'utf8')
  }

  async run(): Promise<void> {
    let envExists = false
    let envProjectExists = false
    let envVaultExists = false

    // 1. create .gitignore if doesn't exist
    if (this.missing()) {
      this.touch()
    }

    // 2. iterate over gitignore lines
    const lines = this.read().split(/\r?\n/)

    // 3. for each line check if ignore already exists
    for (const line of lines) {
      const trimLine = line.trim()

      if (trimLine === this.envFormat) {
        envExists = true
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

    if (envProjectExists === false) {
      this.append('\n' + this.envProjectFormat)
    }

    if (envVaultExists === false) {
      this.append('\n' + this.envVaultFormat)
    }
  }
}

export {AppendToGitignoreService}
