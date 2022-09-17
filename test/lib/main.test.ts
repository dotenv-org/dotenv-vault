import {expect, test} from '@oclif/test'
import {CliUx} from '@oclif/core'
import {writeFileSync} from 'node:fs'
import { fs } from 'memfs';

import {config} from '../../src/lib/main'

let testPath = 'test/.env'
const dotenvKey = 'production/key_1111111111111111111111111111111111111111111111111111111111111111'

describe('config', () => {
  afterEach(() => {
    delete process.env.DOTENV_KEY
  })

  it('falls back to standard dotenv when no DOTENV_KEY', () => {
    const result = config({path: testPath})

    expect(Object.keys(result)[0]).to.equal('parsed')
  })

  it('parses the .env.vault#DOTENV_KEY production data', () => {
    process.env.DOTENV_KEY = dotenvKey

    const result = config({path: testPath})
    const parsed = result.parsed

    expect(parsed.BASIC).to.equal('production')
  })

  it('parses the .env.vault#DOTENV_KEY staging data', () => {
    process.env.DOTENV_KEY = 'staging/key_1111111111111111111111111111111111111111111111111111111111111111'

    const result = config({path: testPath})
    const parsed = result.parsed

    expect(parsed.BASIC).to.equal('staging')
  })

  it('has a short DOTENV_KEY', () => {
    process.env.DOTENV_KEY = 'production/key_1234'

    expect(function() {
      config({path: testPath})
    }).to.throw(Error)
  })

  it('is missing DOTENV_KEY', () => {
    process.env.DOTENV_KEY = ''

    const result = config({path: testPath})
    const parsed = result.parsed

    expect(parsed.BASIC).to.equal('basic')
  })

  it('has an incorrect DOTENV_KEY', () => {
    process.env.DOTENV_KEY = 'production/key_2222222222222222222222222222222222222222222222222222222222222222'

    expect(function() {
      config({path: testPath})
    }).to.throw(Error)
  })

  it('has a malformed ciphertext', () => {
    process.env.DOTENV_KEY = dotenvKey

    testPath = 'test/.env.malformed'

    expect(function() {
      config({path: testPath})
    }).to.throw(Error)
  })
})
