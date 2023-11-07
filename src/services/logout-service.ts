import * as crypto from 'crypto';
import chalk from 'chalk';
import axios, { AxiosRequestConfig } from 'axios';
import { vars } from '../vars';
import { CliUx } from '@oclif/core';
import { LogService } from '../services/log-service';
import { AbortService } from '../services/abort-service';

interface LogoutServiceAttrs {
  cmd: any;
  yes: boolean;
}

class LogoutService {
  private readonly cmd: any;
  private readonly yes: boolean;
  private readonly log: LogService;
  private readonly abort: AbortService;
  private readonly requestUid: string;
  private controller?: AbortController;
  private checkCount = 0;
  private static readonly MAX_CHECK_COUNT = 50;

  constructor(attrs: LogoutServiceAttrs = {} as LogoutServiceAttrs) {
    this.cmd = attrs.cmd;
    this.yes = attrs.yes;
    this.log = new LogService({ cmd: attrs.cmd });
    this.abort = new AbortService({ cmd: attrs.cmd });
    const rand = crypto.randomBytes(32).toString('hex');
    this.requestUid = `req_${rand}`;
  }

  async run(): Promise<void> {
    await this.logout();
  }

  private async logout(showInstructions = true): Promise<void> {
    if (!this.yes) {
      this.log.local(`Logout URL: ${this.logoutUrl}`);
      const answer = await CliUx.ux.prompt(`${chalk.dim(this.log.pretextLocal)}Press ${chalk.green('y')} (or any key) to logout and revoke credential (.env.me) or ${chalk.yellow('q')} to exit`);
      if (answer.toLowerCase() === 'q') {
        this.abort.quit();
      }
    }

    this.log.local(`Opening browser to ${this.logoutUrl}`);
    try {
      await CliUx.ux.open(this.logoutUrl);
    } catch (error) {
      // handle error
    }
    CliUx.ux.action.start(`${chalk.dim(this.log.pretextLocal)}Waiting for logout and credential (.env.me) to be revoked`);
    await this.check(showInstructions);
  }

  private async check(showInstructions = true): Promise<void> {
    this.controller?.abort();
    this.controller = new AbortController();

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {
        vaultUid: vars.vaultValue,
        requestUid: this.requestUid,
      },
      url: this.checkUrl,
      signal: this.controller.signal,
    };

    let resp;
    try {
      this.checkCount += 1;
      resp = await axios(options);
    } catch (error: any) {
      resp = error.response;
    } finally {
      if (resp.status < 300) {
        CliUx.ux.action.stop();
        const meUid = resp.data.data.meUid;
        this.log.local(`Revoked .env.me (DOTENV_ME=${meUid.slice(0, 9)}...)`);
        if (showInstructions) {
          this.log.plain('');
          this.log.plain(`Run ${chalk.bold(`${vars.cli} login`)} to generate a new credential (.env.me)`);
        }
      } else if (this.checkCount < LogoutService.MAX_CHECK_COUNT) {
        await CliUx.ux.wait(2000);
        await this.check(showInstructions);
      } else {
        CliUx.ux.action.stop('giving up');
        this.log.local('Things were taking too long... gave up. Please try again.');
      }
    }
  }

  private get logoutUrl(): string {
    return `${vars.apiUrl}/logout?DOTENV_VAULT=${vars.vaultValue}&requestUid=${this.requestUid}`;
  }

  private get checkUrl(): string {
    return `${vars.apiUrl}/check?DOTENV_VAULT=${vars.vaultValue}&requestUid=${this.requestUid}`;
  }
}

export { LogoutService };
