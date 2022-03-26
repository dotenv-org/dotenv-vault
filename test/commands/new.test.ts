import {expect, test} from '@oclif/test'
import {CliUx} from '@oclif/core'
import {writeFileSync} from 'node:fs'
import { fs } from 'memfs';

describe('new', () => {
  // test
  // .stub(fs, 'writeFileSync', async () => 'nothing')
  // .stub(CliUx.ux, 'open', () => async () => 'open')
  // .stub(CliUx.ux, 'confirm', () => async () => true)
  // .stub(CliUx.ux, 'prompt', () => async () => 'prj_1234')
  // .stdout()
  // .command(['new'])
  // .it('completes', ctx => {
  //   expect(ctx.stdout).to.contain('Completed.')
  // })

  // test
  // .stub(writeFileSync, '', () => async () => 'nothing')
  // .stub(CliUx.ux, 'open', () => async () => 'open')
  // .stub(CliUx.ux, 'confirm', () => async () => false)
  // .stub(CliUx.ux, 'prompt', () => async () => 'prj_1234')
  // .stdout()
  // .command(['new'])
  // .it('aborts', ctx => {
  //   expect(ctx.stdout).to.contain('Aborted.')
  // })
})
