# dotenv-vault

<img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/dotenv-vault.png" alt="dotenv-vault" align="right" />

Dotenv Vault cli is a command line tool that syncs your `.env` files across machines and between your team members. It's like 1Password, but for developers. Designed by the same people that brought you [dotenv](https://github.com/motdotla/dotenv), it's recommended for use with [dotenv](https://github.com/motdotla/dotenv).

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

display help for dotenv-vault

```
USAGE
  $ dotenv-vault help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

### `dotenv-vault new`

Create your `.env.project` file.

Example:

```bash
$ dotenv-vault new
```

### `dotenv-vault push [FILENAME]`

Push your `.env` file to development environment.

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

##### --dotenv_me

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault push .env.development --dotenv_me=me_1234
# pushes local .env.development to remote development
```

### `dotenv-vault pull [ENVIRONMENT] [FILENAME]`

Pulls your development|staging|ci|production environment(s) to your machine.

Example:

```bash
$ dotenv-vault pull
# pulls remote development envs to .env
```

For more information run..

```bash
$ dotenv-vault help pull
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

##### --dotenv_me

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault pull staging --dotenv_me=me_1234
# pulls remote staging envs to .env.staging

$ dotenv-vault pull production .env --dotenv_me=me_1234
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

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dotenv-vault
$ dotenv-vault COMMAND
running command...
$ dotenv-vault (--version)
dotenv-vault/0.1.8 darwin-arm64 node-v17.8.0
$ dotenv-vault --help [COMMAND]
USAGE
  $ dotenv-vault COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dotenv-vault help [COMMAND]`](#dotenv-vault-help-command)
* [`dotenv-vault new`](#dotenv-vault-new)
* [`dotenv-vault pull [ENVIRONMENT] [FILENAME]`](#dotenv-vault-pull-environment-filename)
* [`dotenv-vault push [FILENAME]`](#dotenv-vault-push-filename)

## `dotenv-vault help [COMMAND]`

Display help for dotenv-vault.

```
USAGE
  $ dotenv-vault help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for dotenv-vault.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `dotenv-vault new`

Create your project at Dotenv Vault

```
USAGE
  $ dotenv-vault new

DESCRIPTION
  Create your project at Dotenv Vault

EXAMPLES
  $ dotenv-vault new
```

_See code: [dist/commands/new.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.8/dist/commands/new.ts)_

## `dotenv-vault pull [ENVIRONMENT] [FILENAME]`

Pull .env securely from Dotenv Vault

```
USAGE
  $ dotenv-vault pull [ENVIRONMENT] [FILENAME] [-m <value>]

ARGUMENTS
  ENVIRONMENT  (development|ci|staging|production) [default: development] Pull .env.ci, .env.staging, and
               .env.production
  FILENAME     Set output filename. Defaults to .env for development and .env.{environment} for other environments

FLAGS
  -m, --dotenvMe=<value>  Pass .env.me credential directly (rather than reading from .env.me file)

DESCRIPTION
  Pull .env securely from Dotenv Vault

EXAMPLES
  $ dotenv-vault pull
```

_See code: [dist/commands/pull.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.8/dist/commands/pull.ts)_

## `dotenv-vault push [FILENAME]`

Push .env securely to Dotenv Vault

```
USAGE
  $ dotenv-vault push [FILENAME] [-m <value>]

ARGUMENTS
  FILENAME  Set input filename. Defaults to .env for development and .env.{environment} for other environments

FLAGS
  -m, --dotenvMe=<value>  Pass .env.me credential directly (rather than reading from .env.me file)

DESCRIPTION
  Push .env securely to Dotenv Vault

EXAMPLES
  $ dotenv-vault push
```

_See code: [dist/commands/push.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.8/dist/commands/push.ts)_
<!-- commandsstop -->
