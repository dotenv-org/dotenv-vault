# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [Unreleased](https://github.com/dotenv-org/dotenv-vault/compare/v1.11.1...master)

## 1.11.1

- Various small cosmetic changes 🧹

## 1.11.0

- Added `status` command - for example, `dotenv-vault status`. Check the operational status of dotenv-vault's systems. [discussion](https://github.com/dotenv-org/dotenv-vault/discussions/101)

## 1.10.0

### Added

- Added `versions` command - for example, `dotenv-vault versions [environment]` [discussion](https://github.com/dotenv-org/dotenv-vault/discussions/91)
- Added `@version` option to `pull` command - for example, `dotenv-vault pull production@v24`
- Added `.previous` file generation when pulling. This way if you accidently override your local .env file you can still access it. [#89](https://github.com/dotenv-org/dotenv-vault/pull/89)

## 1.9.1

### Added

- Added `[environment]` argument to `open` command - for example, `dotenv-vault open staging`

## 1.9.0

### Added

- Added `logout` command for revoking .env.me credential(s) 🔐
- Abort without stacktrace when quitting prompt with `q`
- Improved error formatting

## 1.8.1

### Changed

- When specifying `development` environment, select `.env.development` first and fallback to `.env` file

## 1.8.0

### Added

- Added `dotenv-vault whoami` command. Displays the current logged in user. 🦉

## 1.7.0

### Added

- Add `-y`, `--yes` flags to automatically continue through an interactive prompts. ⛳️
- Added more helpful message when asking to say yes interactively.

## 1.6.3

### Changed

- Clarifications in README and removed minimum node 14 requirement. Working with 12 and lower.

## 1.6.2

### Changed

- Clarified informational language on `new` and `login` commands 🧹

## 1.6.1

### Added

- Add informative text to generation of `.env.vault` and `.env.me` file ([#64](https://github.com/dotenv-org/dotenv-vault/pull/64))

## 1.6.0

### Added

- Add optional `dotenvMe` argument to `login` command to avoid the browser hop 🎉 ([#63](https://github.com/dotenv-org/dotenv-vault/pull/63))

## 1.5.5

### Added

- Prompt before opening browser 🧹 ([#62](https://github.com/dotenv-org/dotenv-vault/pull/62))

## 1.5.4

### Changed

- Changed .catch error handling for server machines that do not have browsers 🐞

## 1.5.3

### Added

- Display url for  `new`, `login`, and `open` commands. This makes it possible to configure dotenv-vault from server machines (lacking browsers) 🐞 ([#61](https://github.com/dotenv-org/dotenv-vault/pull/61))

## 1.5.2

### Changed

- Removed use of 'node:fs' and 'node:crypto' that were causing install issues on older versions of node 🧹([#57](https://github.com/dotenv-org/dotenv-vault/pull/57))

## 1.5.1

### Added

- Time out check on `new` and `login` after a couple minutes 🧹([#56](https://github.com/dotenv-org/dotenv-vault/pull/56))

## 1.5.0

### Added

- Add `open` command. Opens directly to project's vault page 🎉 ([#55](https://github.com/dotenv-org/dotenv-vault/pull/55))

## 1.4.0

### Changed

- Create .env.vault in place of .env.project. (.env.project files will still continue to work) ([#53](https://github.com/dotenv-org/dotenv-vault/pull/53))

## 1.3.2

### Changed

- `new` command polls and writes to .env.project automatically ([#52](https://github.com/dotenv-org/dotenv-vault/pull/52))

## 1.3.1

### Added

- Smartly prompt for login as part of `push` and `pull` commands 

## 1.3.0

### Added

- Add terminal colors 🎨
- Protect developer from accidentally overwriting .env.project file 🔐
- Add `login` command 🎉
- Update `push` and `pull` commands to be less verbose 🧹 ([#51](https://github.com/dotenv-org/dotenv-vault/pull/51))

## 1.2.3

### Changed

- Require node 14 or greater. 🧹 ([#50](https://github.com/dotenv-org/dotenv-vault/pull/50))

## 1.2.2

### Changed

- Turned on `esModuleInterop` in typescript config. 🧹 ([#49](https://github.com/dotenv-org/dotenv-vault/pull/49))
- Minor dependency updates

## 1.2.1

### Changed

- Update dependencies. 🧹 ([#42](https://github.com/dotenv-org/dotenv-vault/pull/42))

## 1.2.0

### Added

- Update git, npm, and docker ignore process to support .env.vault files ([#41](https://github.com/dotenv-org/dotenv-vault/pull/41))

## 1.1.0

### Added

- Support pulling .env.example file - configurable in project settings `npx dotenv-vault@latest pull example` 🎉 ([#40](https://github.com/dotenv-org/dotenv-vault/pull/40))

## 1.0.0

### Changed

- _Breaking:_ Consistent ordering of arguments. push/pull [environment] [filename] 🎉 ([#38](https://github.com/dotenv-org/dotenv-vault/pull/38))

## 0.7.0

### Added

On push automatically infer environment from filename 🎉 ([#37](https://github.com/dotenv-org/dotenv-vault/pull/37))

## 0.6.0

### Added

Optionally pass .env.project identifier to `new` command (bypassing user prompt) 🎉 ([#36](https://github.com/dotenv-org/dotenv-vault/pull/36))

## 0.5.1

### Removed

Remove deprecated crypto dependency 🧹 ([#31](https://github.com/dotenv-org/dotenv-vault/pull/31))

## 0.5.0

### Added

Append to npmignore file if it exists 🔒 ([#29](https://github.com/dotenv-org/dotenv-vault/pull/29))

## 0.4.2

### Changed

Modified local: and remote: spacing for better visual log experience 🧑‍💻 ([#28](https://github.com/dotenv-org/dotenv-vault/pull/28))

## 0.4.1

### Added

Remove comment in .env.me for better DSX 🧑‍💻 ([#21](https://github.com/dotenv-org/dotenv-vault/pull/21))

## 0.4.0

### Added

Append to dockerignore file if it exists 🔒 ([#19](https://github.com/dotenv-org/dotenv-vault/pull/19))

## 0.3.2

### Changed

Main environment no longer defaults to development. Instead, Vault's API smartly determines the default depending on your project's custom settings - in most cases this will still be development. ([#14](https://github.com/dotenv-org/dotenv-vault/pull/14))

## 0.3.1

### Changed

Respect `-- dotenvMe` flag. 🐞 ([#13](https://github.com/dotenv-org/dotenv-vault/pull/13))

## 0.3.0

### Added

`push` to other environments. 🎉 ([#12](https://github.com/dotenv-org/dotenv-vault/pull/12))

## 0.2.1

### Added

Prefill project name on `new` command 🎉 ([#11](https://github.com/dotenv-org/dotenv-vault/pull/11))

## 0.2.0

### Added

Custom environments 🎉 ([#10](https://github.com/dotenv-org/dotenv-vault/pull/10))

## 0.1.11 and prior

Please see commit history.

