import {expect, test} from '@oclif/test'
import {CliUx} from '@oclif/core'
import {writeFileSync} from 'node:fs'
import { fs } from 'memfs';

import {config} from '../../src/lib/main'

const testPath = 'test/.env'
const dotenvEt = 'et_1111111111111111111111111111111111111111111111111111111111111111'

describe('config', () => {
  afterEach(() => {
    delete process.env.DOTENV_ENVIRONMENT
  })

  it('falls back to standard dotenv when no DOTENV_ENVIRONMENT', () => {
    const result = config({path: testPath})

    expect(Object.keys(result)[0]).to.equal('parsed')
  })

  it('parses the .env.vault#DOTENV_ENVIRONMENT production data', () => {
    process.env.DOTENV_ET = dotenvEt
    process.env.DOTENV_ENVIRONMENT = 'production'

    const result = config({path: testPath})
    const parsed = result.parsed

    expect(parsed.BASIC).to.equal('production')
  })

  it('parses the .env.vault#DOTENV_ENVIRONMENT staging data', () => {
    process.env.DOTENV_ET = dotenvEt
    process.env.DOTENV_ENVIRONMENT = 'staging'

    const result = config({path: testPath})
    const parsed = result.parsed

    expect(parsed.BASIC).to.equal('staging')
  })
})
