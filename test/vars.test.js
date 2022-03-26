import {expect} from '@clif/test'

import {vars} from '../src/vars'

const env = process.env
beforeEach(() => {
  process.env = {}
})
afterEach(() => {
  process.env = env
})

describe('vars', () => {
  it('sets vars by default', () => {
    expect(vars.apiUrl).to.equal('https://vault.dotenv.org')
  })

  it('respects DOTENV_API_URL', () => {
    process.env.DOTENV_API_URL = 'https://vault.dotenv.development'
    expect(vars.apiUrl).to.equal('https://vault.dotenv.development')
  })
})
