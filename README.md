oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

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
dotenv-vault/0.1.7 darwin-arm64 node-v17.8.0
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

_See code: [dist/commands/new.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.7/dist/commands/new.ts)_

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

_See code: [dist/commands/pull.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.7/dist/commands/pull.ts)_

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

_See code: [dist/commands/push.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.7/dist/commands/push.ts)_
<!-- commandsstop -->
