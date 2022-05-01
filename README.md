From the same people that pioneered [dotenv](https://github.com/motdotla/dotenv).

# dotenv-vault

<img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/dotenv-vault.png" alt="dotenv-vault" align="right" />

Dotenv Vault securely syncs secrets and app configuration across your machines, environments, and team members. Stop sharing .env files over insecure channels like Slack and email.

Learn more at [dotenv.org](https://dotenv.org).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![Downloads/week](https://img.shields.io/npm/dw/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![License](https://img.shields.io/npm/l/dotenv-vault.svg)](https://github.com/dotenv-org/dotenv-vault/blob/master/package.json)

## Works With

Dotenv Vault works with the following integration partners and more.

<table>
  <tr>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/github.png" alt="dotenv-vault + github", width="30" /></span> <span>GitHub</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/heroku.png" alt="dotenv-vault + Heroku", width="30" /></span> <span>Heroku</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/slack.png" alt="dotenv-vault + Slack", width="30" /></span> <span>Slack</span>
    </td>
  </tr>
  <tr>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/vercel.png" alt="dotenv-vault + Vercel", width="30" /></span> <span>Vercel</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/netlify.png" alt="dotenv-vault + Netlify", width="30" /></span> <span>Netlify</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/aws.png" alt="dotenv-vault + AWS Secrets", width="30" /></span> <span>AWS Secrets</span>
    </td>
  </tr>
  <tr>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/aws.png" alt="dotenv-vault + AWS Parameter Store", width="30" /></span> <span>AWS Parameter Store</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/microsoft.png" alt="dotenv-vault + Azure Key Vault", width="30" /></span> <span>Azure Key Vault</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/docker.png" alt="dotenv-vault + Docker Compose", width="30" /></span> <span>Docker Compose</span>
    </td>
  </tr>
  <tr>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/docker.png" alt="dotenv-vault + Docker", width="30" /></span> <span>Docker</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/digitalocean.png" alt="dotenv-vault + Digital Ocean", width="30" /></span> <span>Digital Ocean</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/google.png" alt="dotenv-vault + Google Cloud", width="30" /></span> <span>Google Cloud</span>
    </td>
  </tr>
  <tr>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/circleci.png" alt="dotenv-vault + CircleCI", width="30" /></span> <span>CircleCI</span>
    </td>
    <td valign="middle">
      <span><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/serverless.png" alt="dotenv-vault + Serverless", width="30" /></span> <span>Serverless</span>
    </td>
    <td valign="middle">
    </td>
  </tr>
</table>

## Usage

Usage is easy! Run the command:

```bash
$ npx dotenv-vault new
```

Follow those instructions and then run:

```bash
$ npx dotenv-vault push
```

And if you need to pull changes that another teammate made, run:

```bash
$ npx dotenv-vault pull
```

That's it!

Read our [security statement](https://www.dotenv.org/security).

💡 **ProTip!** Append @latest to dotenv-vault to always run the latest version. For example: `npx dotenv-vault@latest push`. (otherwise, npx caches the first version it encounters on your machine)

## Commands

### `dotenv-vault new`

Create your project at Dotenv Vault.

Example:

```bash
$ dotenv-vault new
```

### `dotenv-vault push [FILENAME] [ENVIRONMENT]`

Push your `.env` file securely to Dotenv Vault

Example:

```bash
$ dotenv-vault push
# pushes local .env to remote development
```

#### Arguments

##### [FILENAME]

Set input filename. Defaults to .env.

Example:

```bash
$ dotenv-vault push .env.development
# pushes .env.development to remote development environment
```

##### [ENVIRONMENT]

Example:

```bash
$ dotenv-vault push .env.production production
# pushes local .env.production to remote production environment
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault push .env.development --dotenvMe=me_1234
# pushes local .env.development to remote development
```

### `dotenv-vault pull [ENVIRONMENT] [FILENAME]`

Pulls your development|staging|ci|production environment(s) to your machine.

Example:

```bash
$ dotenv-vault pull
# pulls remote development envs to .env
```

#### Arguments

##### [ENVIRONMENT]

Pull .env.ci, .env.staging, and .env.production

Example:

```bash
$ dotenv-vault pull staging
# pulls remote staging envs to .env.staging
```

##### [FILENAME]

Set output filename. Defaults to .env for development and .env.{environment} for other environments

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

### `dotenv-vault help [COMMAND]`

Display help for dotenv-vault commands.

```
USAGE
  $ dotenv-vault help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

Example:

```
$ dotenv-vault help push
```



## Development

```
NODE_TLS_REJECT_UNAUTHORIZED=0 DOTENV_API_URL=https://vault.dotenv.development ./bin/dev
```

### Testing

```
npm test
```

### Publishing

Only for those with permission.

```
npm version patch
npm publish
```

## Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

## CHANGELOG

See [CHANGELOG.md](CHANGELOG.md)
