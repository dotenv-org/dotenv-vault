# dotenv-vault

<img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/dotenv-vault.png" alt="dotenv-vault" align="right" />

Dotenv Vault securely syncs secrets and app configuration across your machines, environments, and team members. Stop sharing .env files over insecure channels like Slack and email. From the same people that pioneered [dotenv](https://github.com/motdotla/dotenv).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![Downloads/week](https://img.shields.io/npm/dw/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![License](https://img.shields.io/npm/l/dotenv-vault.svg)](https://github.com/dotenv-org/dotenv-vault/blob/master/package.json)

## Usage

Usage is easy! Run the command:

```bash
npx dotenv-vault new
```

Follow those instructions and then run:

```bash
npx dotenv-vault push
```

And if you need to pull changes that another teammate made, run:

```bash
npx dotenv-vault pull
```

That's it!

## Commands

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

### `dotenv-vault new`

Create your project at Dotenv Vault.

Example:

```bash
$ dotenv-vault new
```

### `dotenv-vault push [FILENAME]`

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
