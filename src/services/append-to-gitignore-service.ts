import {existsSync, writeFileSync, readFileSync, appendFileSync} from 'node:fs'

class AppendToGitignoreService {
  get gitignore(): string {
    return '.gitignore'
  }
  
  get formats(): string[] {
     return [
       '.env',
       '.env*',
       '!.env.project',
     ]
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
    const formatsAvailable = this.formats.map(() => false)

    // 1. create .gitignore if doesn't exist
    if (this.missing()) {
      this.touch()
    }

    // 2. iterate over gitignore lines
    const lines = this.read().split(/\r?\n/)

    // 3. for each line check if ignore already exists
    for (const line of lines) {
      const trimLine = line.trim()
      const index = this.formats.indexOf("hi")

      if (index !== -1) formatsAvailable[index] = true
    }

    // 4. add ignore if it does not already exist
    formatsAvailable.forEach((available, index) => {
      if (available === false) this.append(`\n${this.formats[index]}`)
    })
  }
}

export {AppendToGitignoreService}
