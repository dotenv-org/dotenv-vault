# dotenv-vault

<img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt="dotenv-vault" align="right" width="200" />

Sync .env files.

Stop sharing them over insecure channels like Slack and email and never lose an important .env file again.

dotenv-vault extends the proven & trusted foundation of [dotenv](https://github.com/motdotla/dotenv) with syncing, multiple environments, and integration everywhere - all using a `.env.vault` file.

[![Version](https://img.shields.io/npm/v/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![Downloads](https://img.shields.io/npm/dt/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)

---

## Integrates With

Integrates with any [dotenv library](https://dotenv.org/libraries?r=1) and integrates everywhere across infrastructure.

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

Visit [dotenv.org/docs](https://www.dotenv.org/docs/tutorials/sync?r=1) for a complete getting started guide.

---

<h1 align="center">
  <a href="https://docs.dotenv.org?r=1"><img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" alt="dotenv-vault" width="80" height="80" ></a>
  <br>
  Dotenv Vault
  <br>
</h1>

<h4 align="center">Sync your .env files, quickly & securely.</h4>
<p align="center">Stop sharing them over insecure channels like Slack and email, and never lose an important <strong>.env</strong> file again.</p>

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

[![1 Minute Overview](./dotenv-vault.png)](https://www.youtube.com/watch?v=z-lBjxfhWeY)

<p align="center">
  <a href="https://npmjs.org/package/dotenv-vault"><img src="https://img.shields.io/npm/dt/dotenv-vault.svg" alt="Downloads"></a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="https://npmjs.org/package/dotenv-vault"><img src="https://img.shields.io/npm/v/dotenv-vault.svg" alt="Version"></a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="https://marketplace.visualstudio.com/items?itemName=dotenv.dotenv-vscode"><img src="https://img.shields.io/visual-studio-marketplace/v/dotenv.dotenv-vscode?label=VS%20Marketplace&logo=visual-studio-code" alt="Version"></a>
</p>

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
  login     Log in
  logout    Log out
  open      Open project page
  push      Push .env securely
  pull      Pull .env securely
  versions  List version history
  whoami    Display the current logged in user
  status    Check dotenv.org status
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
