<h1 align="center">
  <a href="https://docs.dotenv.org"><img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" alt="dotenv-vault" width="100" height="100" ></a>
  <br>
  dotenv-vault
  <br>
</h1>

<h4 align="center">Sync environment variables, securely.</h4>

<p align="center">
  <a href="https://www.dotenv.org/docs/getting-started/with-dotenv-vault?r=1">Getting Started</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="https://www.dotenv.org/docs/security/overview?r=1" target="_blank">Security</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="https://www.dotenv.org/docs/dotenv-vault?r=1">Commands</a>
</p>
<img src="https://img.spacergif.org/v1/spacer.gif" width="1" height="10">

![dotenv-vault](./dotenv-vault.png)

# dotenv-vault

<img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/dotenv-vault.png" alt="dotenv-vault" align="right" width="120" />

dotenv-vault securely syncs secrets and app configuration across your machines, environments, and team members. Stop sharing .env files over insecure channels like Slack and email - from the same people that pioneered [dotenv](https://github.com/motdotla/dotenv).

[![Version](https://img.shields.io/npm/v/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![Downloads](https://img.shields.io/npm/dt/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![License](https://img.shields.io/npm/l/dotenv-vault.svg)](https://github.com/dotenv-org/dotenv-vault/blob/master/package.json)
[![Featured on Openbase](https://badges.openbase.com/js/featured/dotenv-vault.svg?token=rF2f+2Z47SSdf5TjTnEBUAR6ZJS1vQaqcTLdu7pR70s=)](https://openbase.com/js/dotenv-vault?utm_source=embedded&amp;utm_medium=badge&amp;utm_campaign=rate-badge)
[![dotenv-vault push](https://api.checklyhq.com/v1/badges/checks/c2fee99a-38e7-414e-89b8-9766ceeb1927?style=flat&theme=default&responseTime=true)](https://health.dotenv.org/)
[![dotenv-vault pull](https://api.checklyhq.com/v1/badges/checks/4f557967-1ed1-486a-b762-39a63781d752?style=flat&theme=default&responseTime=true)](https://health.dotenv.org/)

---

## Works With

Works with any [dotenv library](https://dotenv.org/libraries?r=1) and integrates into most infrastructure (and growing).

<table>
  <tbody>
    <tr>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/github.png" alt="dotenv-vault + github", width="30" />
        GitHub
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/integrations/heroku?r=1">
          <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/heroku.png" alt="dotenv-vault + Heroku", width="30" />
          Heroku
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/integrations/slack?r=1">
          <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/slack.png" alt="dotenv-vault + Slack", width="30" />
          Slack
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/integrations/vercel?r=1">
          <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/vercel.png" alt="dotenv-vault + Vercel", width="30" />
          Vercel
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/integrations/netlify?r=1">
          <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/netlify.png" alt="dotenv-vault + Netlify", width="30" />
          Netlify
        </a>
      </td>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/aws.png" alt="dotenv-vault + AWS Secrets", width="30" />
        AWS Secrets
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/aws.png" alt="dotenv-vault + AWS Parameter Store", width="30" />
        AWS Parameter Store
      </td>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/microsoft.png" alt="dotenv-vault + Azure Key Vault", width="30" />
        Azure Key Vault
      </td>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/docker.png" alt="dotenv-vault + Docker Compose", width="30" />
        Docker Compose
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/integrations/docker?r=1">
          <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/docker.png" alt="dotenv-vault + Docker", width="30" />
          Docker
        </a>
      </td>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/digitalocean.png" alt="dotenv-vault + Digital Ocean", width="30" />
        Digital Ocean
      </td>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/google.png" alt="dotenv-vault + Google Cloud", width="30" />
        Google Cloud
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/circleci.png" alt="dotenv-vault + CircleCI", width="30" />
        CircleCI
      </td>
      <td align="left" valign="middle">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/serverless.png" alt="dotenv-vault + Serverless", width="30" />
        Serverless
      </td>
      <td align="left" valign="middle">
      </td>
    </tr>
  </tbody>
</table>

## Usage

Usage is similar to git. Run the command:

```bash
$ npx dotenv-vault new
```

Follow those instructions and then run:

```bash
$ npx dotenv-vault login
```

Then run push and pull:

```bash
$ npx dotenv-vault push
$ npx dotenv-vault pull
```

That's it!

## Commands

### `dotenv-vault new [dotenvVault]`

Create your project at dotenv-vault.

Example:

```bash
$ dotenv-vault new
```

#### Arguments

##### [dotenvVault]

Set .env.vault identifier. Defaults to generated value.

Example:

```bash
$ dotenv-vault new vlt_a5ue8…
# set .env.vault project identifier to vlt_a5ue8…
```

#### Options

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault new -y
# skips over prompt for permission to open browser window
```

### `dotenv-vault login [dotenvMe]`

Authenticate your project at dotenv-vault.

Example:

```bash
$ dotenv-vault login
```

#### Arguments

##### [dotenvMe]

Set .env.me credential. Defaults to generated value.

Example:

```bash
$ dotenv-vault login me_13b33…
# set .env.me credential to me_13b33…
```

#### Options

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault login --yes
# skips over prompt for permission to open browser window
```

### `dotenv-vault logout`

Log out of dotenv-vault 

Example:

```bash
$ dotenv-vault logout
```

#### Options

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault logout -y
# skips over prompt for permission to open browser window
```

### `dotenv-vault push [environment] [filename]`

Push your `.env` file securely to dotenv-vault 

Example:

```bash
$ dotenv-vault push
# pushes local .env to remote development
```

#### Arguments

##### [environment]

Example:

```bash
$ dotenv-vault push staging
# pushes local .env.staging to remote staging environment
```

##### [filename]

Set input filename. Defaults to .env.

Example:

```bash
$ dotenv-vault push staging .env.stag
# pushes .env.stag to remote staging environment
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault push development --dotenvMe=me_1234
# pushes local .env to remote development
```

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault push --yes
# skips over prompt for permission to open browser window
```

### `dotenv-vault pull [environment] [filename]`

Pulls your development|staging|ci|production environment(s) to your machine.

Example:

```bash
$ dotenv-vault pull
# pulls remote development envs to .env
```

#### Arguments

##### [environment]

Pull .env.ci, .env.staging, and .env.production

Example:

```bash
$ dotenv-vault pull staging
# pulls remote staging envs to .env.staging
```

##### [filename]

Set output filename. Defaults to .env for development and .env.{environment} for other environments. Exception: When using <code>DOTENV_IT</code> tokens it defaults to `.env` for all environments.

Example:

```bash
$ dotenv-vault pull production .env
# pulls remote production envs to .env
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault pull staging --dotenvMe=me_1234
# pulls remote staging envs to .env.staging

$ dotenv-vault pull production .env --dotenvMe=me_1234
# pulls remote production envs to .env
```

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault pull -y
# skips over prompt for permission to open browser window
```

### `dotenv-vault open [environment]`

Open your project in the UI at dotenv-vault.

Example:

```bash
$ dotenv-vault open
```

#### Arguments

##### [environment]

Example:

```bash
$ dotenv-vault open staging
# opens directly to the staging tab of the project in the ui
```

#### Options

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault open -y
# skips over prompt for permission to open browser window
```

### `dotenv-vault whoami`

Display the current logged in user

Example:

```bash
$ dotenv-vault whoami
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault whoami --dotenvMe=me_1234
```

### `dotenv-vault versions [environment]`

List version history

Example:

```bash
$ dotenv-vault versions
```

#### Arguments

##### [environment]

Example:

```bash
$ dotenv-vault versions production
# List your production version history
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault versions --dotenvMe=me_1234
```

### `dotenv-vault help [command]`

Display help for dotenv-vault commands.

```
USAGE
  $ dotenv-vault help [command]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

Example:

```
$ dotenv-vault help push
```

## Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Development Guide

Fork and clone the repo. Use `./bin/dev` to run local development commands.

```
./bin/dev new
./bin/dev push
./bin/dev pull
# etc
```

If you need to send the request to a different vault url, modify your command(s) to the following.

```
NODE_TLS_REJECT_UNAUTHORIZED=0 DOTENV_API_URL=https://vault.dotenv.development ./bin/dev
```

Note that dotenv-vault uses [oclif](https://oclif.io/).

### Testing

```
npm test
```

### Tarballs

* [https://dotenv-vault-assets.dotenv.org/](https://dotenv-vault-assets.dotenv.org/)
* [http://dotenv-vault.s3-website-us-west-1.amazonaws.com/](http://dotenv-vault.s3-website-us-west-1.amazonaws.com/)

### Publishing

Only for those with permission.

```
npm version patch
npm publish
```

Other notes.

```
npx oclif@3.0.1 pack tarballs
bash
env $(cat .env | xargs) npx oclif@3.0.1 upload tarballs
env $(cat .env | xargs) npx oclif@3.0.1 promote --version VERSION --sha SHA
```

## CHANGELOG

See [CHANGELOG.md](CHANGELOG.md)
