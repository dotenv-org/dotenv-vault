# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [Unreleased](https://github.com/dotenv-org/dotenv-vault/compare/v1.21.0...master)

## [1.21.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.20.0...v1.21.0) (2023-05-05)

### Changed

- Node `>=15` required. Dropped support for 14.

## [1.20.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.19.1...v1.20.0) (2023-05-05)

### Changed

- Node `>=14` required. Dropped support for 12 and 13.

## [1.19.1](https://github.com/dotenv-org/dotenv-vault/compare/v1.19.0...v1.19.1) (2023-05-02)

### Changed

- Fixed `local keys` command when `.env.vault` is missing. [#274](https://github.com/dotenv-org/dotenv-vault/pull/274)

## [1.19.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.18.0...v1.19.0) (2023-04-06)

### Added

- Added `local` only commands [#267](https://github.com/dotenv-org/dotenv-vault/pull/267)

* `local build` - Build .env.vault from local only
* `local decrypt` - Decrypt .env.vault from local only
* `local keys` - List .env.vault local decryption keys from .env.keys file

These are commands that allow you to generate a secure `.env.vault` without needing an account at [dotenv.org](https://www.dotenv.org). There's a little more manual work required by the developer, but this way a developer can choose to use the `.env.vault` standard without relying on the dotenv-vault service. See README for instructions on how to use.

## [1.18.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.17.0...v1.18.0) (2023-01-27)

### Added

- Added `decrypt` command [#236](https://github.com/dotenv-org/dotenv-vault/pull/236)

## [1.17.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.16.3...v1.17.0) (2022-12-13)

### Added

- Added URL to be opened for `new`, `login`, `logout`, `open`, and `status` commands [#175](https://github.com/dotenv-org/dotenv-vault/pull/175) [#183](https://github.com/dotenv-org/dotenv-vault/pull/183)

## [1.16.3](https://github.com/dotenv-org/dotenv-vault/compare/v1.16.2...v1.16.3) (2022-10-28)

### Changed

- Update `dotenv-vault-core` dependency to patch

## [1.16.2](https://github.com/dotenv-org/dotenv-vault/compare/v1.16.1...v1.16.2) (2022-10-28)

### Changed

- Update `dotenv-vault-core` dependency

## [1.16.1](https://github.com/dotenv-org/dotenv-vault/compare/v1.16.0...v1.16.1) (2022-10-28)

### Changed

- Update `rotatekey` help messages [#158](https://github.com/dotenv-org/dotenv-vault/pull/158)

## [1.16.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.15.0...v1.16.0) (2022-10-26)

### Added

- Add `rotatekey` command [#156](https://github.com/dotenv-org/dotenv-vault/pull/156)

## [1.15.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.14.0...v1.15.0) (2022-10-23)

### Changed

- Use [dotenv-vault-core](https://github.com/dotenv-org/dotenv-vault-core) to expose `.config` for use with decrypting .env.vault [#155](https://github.com/dotenv-org/dotenv-vault/pull/155)

## [1.14.0](https://github.com/dotenv-org/dotenv-vault/compare/v1.13.10...v1.14.0) (2022-10-14)

### Added

- Add `[environment]` argument to `keys` command [#152](https://github.com/dotenv-org/dotenv-vault/pull/152)

### Changed

- Improve error messaging when missing encrypted environment

## [1.13.9](https://github.com/dotenv-org/dotenv-vault/compare/v1.13.8...v1.13.9) (2022-09-29)

### Changed

- Improve messaging around missing DOTENV_KEY

## [1.13.8](https://github.com/dotenv-org/dotenv-vault/compare/v1.13.7...v1.13.8) (2022-09-29)

### Added

- Add warning note that DOTENV_KEY is not set - when using in production.

## [1.13.7](https://github.com/dotenv-org/dotenv-vault/compare/v1.13.6...v1.13.7) (2022-09-29)

### Changed

- Patch issue with accessing package.json

## [1.13.6](https://github.com/dotenv-org/dotenv-vault/compare/v1.13.5...v1.13.6) (2022-09-29)

### Added

- Added package version in debug logging [#142](https://github.com/dotenv-org/dotenv-vault/pull/142)

## 1.13.5

### Changed

- Added `override` and `debug` options to `require('dotenv-vault').config(options)` [#141](https://github.com/dotenv-org/dotenv-vault/pull/141)

## 1.13.4

### Changed

- Improved messaging for `build` command

## 1.13.3

### Changed

- Change format of expected `DOTENV_KEY` value.

## 1.13.2

### Added

- Added beta `keys` command. Contact support@dotenv.org for more information.

## 1.13.1

### Added

- Added beta `build` command. Contact support@dotenv.org for more information.

## 1.13.0

### Added

- Added beta `.config()` method. Contact support@dotenv.org for more information.

## 1.12.1

### Changed

- Update `pull` command params to use `DOTENV_VAULT` and `DOTENV_ME`

## 1.12.0

### Added

- Ignore .flaskenv files. Append to .gitignore, .dockerignore, and .npmignore

## 1.11.2

### Changed

- Bold suggested command so the developer doesn't have to read so much text during an aborted process.

## 1.11.1

### Changed

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

