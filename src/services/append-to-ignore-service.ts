import {existsSync, writeFileSync, readFileSync, appendFileSync} from 'node:fs'

class AppendToIgnoreService {
  file: string;

  public static run (entries: string | string[]) {
    const files = Array.isArray(entries) ? entries : [entries]

    return Promise.all(files.map(file => new AppendToIgnoreService(file).run()))
  }

  public constructor (file: string) {
      this.file = file
  }
  
  get formats(): string[] {
     return [
       '.env*',
       '!.env.project',
     ]
  }

  missing(): boolean {
    return !existsSync(this.file)
  }

  append(str: string): void {
    appendFileSync(this.file, str)
  }

  touch(): void {
    writeFileSync(this.file, '')
  }

  read(): string {
    return readFileSync(this.file, 'utf8')
  }

  async run(): Promise<void> {
    const formatsAvailable = this.formats.map(() => false)

    // 1. create .*ignore if doesn't exist
    if (this.missing()) {
      this.touch()
    }

    // 2. iterate over .*ignore lines
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

export {AppendToIgnoreService}
