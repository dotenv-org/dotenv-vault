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
dotenv-vault/0.1.5 darwin-arm64 node-v17.8.0
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
* [`dotenv-vault plugins`](#dotenv-vault-plugins)
* [`dotenv-vault plugins:install PLUGIN...`](#dotenv-vault-pluginsinstall-plugin)
* [`dotenv-vault plugins:inspect PLUGIN...`](#dotenv-vault-pluginsinspect-plugin)
* [`dotenv-vault plugins:install PLUGIN...`](#dotenv-vault-pluginsinstall-plugin-1)
* [`dotenv-vault plugins:link PLUGIN`](#dotenv-vault-pluginslink-plugin)
* [`dotenv-vault plugins:uninstall PLUGIN...`](#dotenv-vault-pluginsuninstall-plugin)
* [`dotenv-vault plugins:uninstall PLUGIN...`](#dotenv-vault-pluginsuninstall-plugin-1)
* [`dotenv-vault plugins:uninstall PLUGIN...`](#dotenv-vault-pluginsuninstall-plugin-2)
* [`dotenv-vault plugins update`](#dotenv-vault-plugins-update)
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

_See code: [dist/commands/new.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.5/dist/commands/new.ts)_

## `dotenv-vault plugins`

List installed plugins.

```
USAGE
  $ dotenv-vault plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ dotenv-vault plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `dotenv-vault plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ dotenv-vault plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ dotenv-vault plugins add

EXAMPLES
  $ dotenv-vault plugins:install myplugin 

  $ dotenv-vault plugins:install https://github.com/someuser/someplugin

  $ dotenv-vault plugins:install someuser/someplugin
```

## `dotenv-vault plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ dotenv-vault plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ dotenv-vault plugins:inspect myplugin
```

## `dotenv-vault plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ dotenv-vault plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ dotenv-vault plugins add

EXAMPLES
  $ dotenv-vault plugins:install myplugin 

  $ dotenv-vault plugins:install https://github.com/someuser/someplugin

  $ dotenv-vault plugins:install someuser/someplugin
```

## `dotenv-vault plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ dotenv-vault plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ dotenv-vault plugins:link myplugin
```

## `dotenv-vault plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ dotenv-vault plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dotenv-vault plugins unlink
  $ dotenv-vault plugins remove
```

## `dotenv-vault plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ dotenv-vault plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dotenv-vault plugins unlink
  $ dotenv-vault plugins remove
```

## `dotenv-vault plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ dotenv-vault plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dotenv-vault plugins unlink
  $ dotenv-vault plugins remove
```

## `dotenv-vault plugins update`

Update installed plugins.

```
USAGE
  $ dotenv-vault plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

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

_See code: [dist/commands/pull.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.5/dist/commands/pull.ts)_

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

_See code: [dist/commands/push.ts](https://github.com/dotenv-org/dotenv-vault/blob/v0.1.5/dist/commands/push.ts)_
<!-- commandsstop -->
