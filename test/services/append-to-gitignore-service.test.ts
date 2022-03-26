import * as fs from 'node:fs'
import * as sinon from 'sinon'
import {expect} from '@oclif/test'

import {AppendToGitignoreService} from '../../src/services/append-to-gitignore-service'

describe('run', async () => {
  beforeEach( () => {
  })

  it('runs', async () => {
    const service = new AppendToGitignoreService()

    const missingStub = sinon.stub(service, 'missing').callsFake( () => {
      return false
    })

    const appendStub = sinon.stub(service, 'append').callsFake( () => {
      return
    })

    await service.run()

    sinon.assert.calledOnce(missingStub)
    sinon.assert.calledTwice(appendStub)

    missingStub.restore()
    appendStub.restore()
  })

  it('only appends what is missing', async () => {
    const service = new AppendToGitignoreService()

    const missingStub = sinon.stub(service, 'missing').callsFake( () => {
      return false
    })

    const appendStub = sinon.stub(service, 'append').callsFake( () => {
      return
    })

    const readStub = sinon.stub(service, 'read').callsFake( () => {
      return ".env*\n"
    })

    await service.run()

    sinon.assert.calledOnce(missingStub)
    sinon.assert.calledOnce(appendStub)

    missingStub.restore()
    appendStub.restore()
  })
})
