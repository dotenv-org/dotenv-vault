# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [Unreleased](https://github.com/dotenv-org/dotenv-vault/compare/v1.2.1...master)

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

