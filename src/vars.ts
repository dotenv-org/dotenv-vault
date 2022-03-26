export class Vars {
  get apiUrl(): string {
    return process.env.DOTENV_API_URL || 'https://vault.dotenv.org'
  }
}

export const vars = new Vars()
