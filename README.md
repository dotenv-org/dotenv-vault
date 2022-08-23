<h1 align="center">
  <a href="https://docs.dotenv.org?r=1"><img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" alt="dotenv-vault" width="80" height="80" ></a>
  <br>
  Dotenv Vault
  <br>
</h1>

<h4 align="center">Sync your .env files, quickly & securely.</h4>

<p align="center">
  <a href="#usage">Usage</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#how-it-works">How It Works</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#commands" target="_blank">Commands</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#health" target="_blank">Health</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#changelog">Changelog</a>
</p>

<img src="https://img.spacergif.org/v1/spacer.gif" width="1" height="10">

[![1 Minute Overview](https://i3.ytimg.com/vi/z-lBjxfhWeY/maxresdefault.jpg)](https://www.youtube.com/watch?v=z-lBjxfhWeY)

<p align="center">
  <a href="https://npmjs.org/package/dotenv-vault"><img src="https://img.shields.io/npm/dt/dotenv-vault.svg" alt="Downloads"></a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="https://npmjs.org/package/dotenv-vault"><img src="https://img.shields.io/npm/v/dotenv-vault.svg" alt="Version"></a>
</p>

<p align="center">
<strong>Dotenv Vault</strong> securely syncs your .env files across your machines, environments, and team members. Stop sharing .env files over insecure channels like Slack and email - from the same people that pioneered <a href="https://github.com/motdotla/dotenv">dotenv</a>.
</p>

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

Visit [dotenv.org/docs](https://www.dotenv.org/docs/getting-started/with-dotenv-vault?r=1) for a complete getting started guide.

## How It Works

<a href="https://www.dotenv.org/docs/security/dotenv-vault"><img src="./how-dotenv-vault-works.png" alt="How Dotenv Vault works" width="500"/></a>

Visit [dotenv.org/docs](https://www.dotenv.org/docs/security/overview?r=1) to learn more.

## Commands

```
$ npx dotenv-vault
Sync your .env files, securely.

VERSION
  dotenv-vault/1.11.0 darwin-arm64 node-v18.3.0

USAGE
  $ dotenv-vault [COMMAND]

COMMANDS
  new       Create your project
  login     Log in to dotenv-vault
  logout    Log out
  open      Open project page
  push      Push .env securely
  pull      Pull .env securely
  versions  List version history
  whoami    Display the current logged in user
  status    Check dotenv-vault operational status
  help      Display help for dotenv-vault.
  update    update the dotenv-vault CLI
```

Visit [dotenv.org/docs](https://www.dotenv.org/docs/dotenv-vault?r=1) for details per command.

## Health

![](https://api.checklyhq.com/v1/badges/checks/c2fee99a-38e7-414e-89b8-9766ceeb1927?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/4f557967-1ed1-486a-b762-39a63781d752?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/804eb6fa-6599-4688-a649-7ff3c39a64b9?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/6a94504e-e936-4f07-bc0b-e08fee2734b3?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/06ac4f4e-3e0e-4501-9987-580b4d2a6b06?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/0ffc1e55-7ef0-4c2c-8acc-b6311871f41c?style=flat&theme=dark&responseTime=true)

Visit [health.dotenv.org](https://health.dotenv.org) for more information.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md)

## License

MIT
