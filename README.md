# dotenv-vault [![NPM Version](https://img.shields.io/npm/v/dotenv-vault.svg?style=flat-square)](https://npmjs.org/package/dotenv-vault)

<img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt="dotenv-vault" align="right" width="200" />

Manage your secrets using dotenv-vault's all-in-one toolkit. Say goodbye to scattered secrets across multiple platforms and tools. The #1 secrets manager for .env files.

Deploy your secrets anywhere with modern encryption and sync your .env files with a single command.

* [🌱 Install](#-install)
* [🏗️  Usage](#%EF%B8%8F-usage)
* [🌴 Multiple Environments](#multiple-environments)
* [🚀 Deploy](#-deploy)
* [🔐 Security](#-security)
* [📖 Commands](#-commands)

## 🌱 Install

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><defs><path id="biApple0" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516c.024.034 1.52.087 2.475-1.258c.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422c.212-2.189 1.675-2.789 1.698-2.854c.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116c-.508.139-1.653.589-1.968.607c-.316.018-1.256-.522-2.267-.665c-.647-.125-1.333.131-1.824.328c-.49.196-1.422.754-2.074 2.237c-.652 1.482-.311 3.83-.067 4.56c.244.729.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899c.319.232 1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472c.357.013 1.061.154 1.782.539c.571.197 1.111.115 1.652-.105c.541-.221 1.324-1.059 2.238-2.758c.347-.79.505-1.217.473-1.282Z"/></defs><g fill="currentColor"><use href="#biApple0"/><use href="#biApple0"/></g></svg>

Install via [Homebrew](https://github.com/dotenv-org/homebrew-brew)

```shell
$ brew install dotenv-org/brew/dotenv-vault
$ dotenv-vault help
```

Install on [Windows](https://dotenv-vault-assets.dotenv.org/)

* [32-bit installer](https://dotenv-vault-assets.dotenv.org/channels/stable/dotenv-vault-x86.exe)
* [64-bit installer](https://dotenv-vault-assets.dotenv.org/channels/stable/dotenv-vault-x64.exe)

Install and run commands via [Docker](https://hub.docker.com/r/dotenv/dotenv-vault)

```shell
$ docker run -w $(pwd) -v $(pwd):$(pwd) -it dotenv/dotenv-vault help
```

Install and run commands via [npx](https://docs.npmjs.com/cli/v7/commands/npx)

```shell
$ npx dotenv-vault help
```

More details at [www.dotenv.org/install](https://www.dotenv.org/install/)

## 🏗️ Usage

Usage is similar to git. Run the command:

```bash
$ dotenv-vault push
```

This will push your `.env` file to Dotenv Vault. Follow those instructions and then run:

```bash
$ dotenv-vault build
```

This will build your `.env.vault` file. Commit that safely to code.

Tell your teammates to pull the latest changes and run the pull command:

```bash
$ dotenv-vault pull
```

That's it! You synced your .env file.

Visit [dotenv.org/docs/quickstart](https://www.dotenv.org/docs/quickstart?r=1) for a complete quickstart ⚡️ guide.

## Multiple Environments

After you've pushed your .env file, dotenv-vault automatically sets up multiple environments. Open an environment to view and edit its environment variables.

```bash
$ npx dotenv-vault open production
```

Edit those values. Would you also like to pull your production .env to your machine? Run the command:

```
$ npx dotenv-vault pull production
```

Visit [dotenv.org/docs/tutorials/environments](https://www.dotenv.org/docs/tutorials/environments?r=1) to learn more.

## 🚀 Deploy

Build your `.env.vault` file to deploy your secrets to any server or cloud platform. It works without third-party integrations. Syncing your secrets over third-party integrations actually increases your attack surface area by scattering them in more places, making it more likely your secrets leak someday. Look what happened to CircleCI. Read on to see how dotenv-vault removes this risk.

Run the build command to generate your encrypted .env.vault file and commit that safely to code.

```
$ npx dotenv-vault build
$ git commit -am "Add .env.vault"
$ git push
```

Run the keys command to view your decryption keys.

```
$ npx dotenv-vault keys
remote:   Listing .env.vault decryption keys... done
 environment DOTENV_KEY
 ─────────── ────────────────────────────────────────────────────────────────────────────────────────────────────────
 develompent dotenv://:key_33ee..@dotenv.org/vault/.env.va…
 production  dotenv://:key_7038..@dotenv.org/vault/.env.va…
```

Set the production key on your server or cloud platform. For example, in Heroku.

```
heroku config:set DOTENV_KEY=dotenv://:key_7038..@dotenv.org/vault/.env.va…
```

That's it! When your code deploys, your .env.vault file will be decrypted just in time, and its secrets injected into your application's environment variables.

There's nothing else like it. [Node.JS](https://github.com/dotenv-org/dotenv-vault-core), [Ruby](https://gitub.com/dotenv-org/dotenv-vault-ruby), [Python](https://github.com/dotenv-org/python-dotenv-vault), [PHP](https://github.com/dotenv-org/phpdotenv-vault) supported – more languages coming soon.

<table>
  <tbody>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/vercel/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/vercel.svg" alt="Vercel", width="20" />
          Vercel
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/heroku/rails">
          <img src="https://www.dotenv.org/assets-www/img/heroku.svg" alt="Heroku", width="20" />
          Heroku
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/github/actions-nextjs">
          <img src="https://www.dotenv.org/assets-www/img/github.svg?r=1" alt="GitHub", width="20" />
          GitHub Actions
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/gitlab/ci-quickstart">
          <img src="https://www.dotenv.org/assets-www/img/gitlab.svg" alt="GitLab", width="20" />
          GitLab CI/CD
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/netlify/astro?r=1">
          <img src="https://www.dotenv.org/assets-www/img/netlify.svg" alt="Netlify", width="20" />
          Netlify
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/docker/express?r=1">
          <img src="https://www.dotenv.org/assets-www/img/docker.svg" alt="Docker", width="20" />
          Docker
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/docker-compose/express?r=1">
          <img src="https://www.dotenv.org/assets-www/img/docker.svg" alt="Docker", width="20" />
          Docker Compose
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/circleci/rails?r=1">
          <img src="https://www.dotenv.org/assets-www/img/circleci.svg" alt="CircleCI", width="20" />
          CircleCI
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/serverless/express?r=1">
          <img src="https://www.dotenv.org/assets-www/img/serverless.svg" alt="Serverless", width="20" />
          Serverless
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/railway/express?r=1">
          <img src="https://www.dotenv.org/assets-www/img/railway.svg" alt="Railway", width="20" />
          Railway
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/render/express?r=1">
          <img src="https://www.dotenv.org/assets-www/img/render.svg" alt="Render", width="20" />
          Render
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/travis-ci/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/travis.svg" alt="Travis CI", width="20" />
          Travis CI
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/google-cloud/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/google-cloud.svg" alt="Google Cloud", width="20" />
          Google Cloud
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/fly/express?r=1">
          <img src="https://www.dotenv.org/assets-www/img/fly.svg" alt="Fly.io", width="20" />
          Fly.io
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/northflank/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/northflank.svg" alt="Northflank", width="20" />
          Northflank
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/buddy/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/buddy.svg" alt="Buddy", width="20" />
          Buddy
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/cloud66/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/cloud66.svg" alt="Cloud66", width="20" />
          Cloud66
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/digital-ocean/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/digital-ocean.svg" alt="Digital Ocean", width="20" />
          Digital Ocean
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/dagger/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/dagger.svg" alt="Dagger", width="20" />
          Dagger
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/bitbucket/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/bitbucket.svg" alt="Bitbucket", width="20" />
          Bitbucket
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/railway/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/nodejs.svg" alt="Node.js", width="20" />
          Node.js
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/vercel/pnpm?r=1">
          <img src="https://www.dotenv.org/assets-www/img/pnpm.svg" alt="Pnpm", width="20" />
          pnpm
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/vercel/express?r=1">
          <img src="https://www.dotenv.org/assets-www/img/express.svg" alt="Express", width="20" />
          Express
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/github/actions-nextjs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/nextjs.svg" alt="NextJS", width="20" />
          NextJS
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/github/actions-remix?r=1">
          <img src="https://www.dotenv.org/assets-www/img/remix.svg" alt="Remix", width="20" />
          Remix
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/netlify/astro?r=1">
          <img src="https://www.dotenv.org/assets-www/img/astro.svg" alt="Astro", width="20" />
          Astro
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/docker/rails?r=1">
          <img src="https://www.dotenv.org/assets-www/img/rails.svg" alt="Rails", width="20" />
          Rails
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/heroku/sinatra?r=1">
          <img src="https://www.dotenv.org/assets-www/img/ruby.svg" alt="Ruby", width="20" />
          Ruby
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/heroku/sinatra?r=1">
          <img src="https://www.dotenv.org/assets-www/img/sinatra.svg" alt="Sinatra", width="20" />
          Sinatra
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/heroku/flask?r=1">
          <img src="https://www.dotenv.org/assets-www/img/flask.svg" alt="Flask", width="20" />
          Flask
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/heroku/flask?r=1">
          <img src="https://www.dotenv.org/assets-www/img/python.svg" alt="Python", width="20" />
          Python
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/supabase/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/supabase.svg" alt="Supabase", width="20" />
          Supabase
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/pulumi/nodejs?r=1">
          <img src="https://www.dotenv.org/assets-www/img/pulumi.svg" alt="Pulumi", width="20" />
          Pulumi
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/vercel/angular?r=1">
          <img src="https://www.dotenv.org/assets-www/img/angular.svg" alt="Angular", width="20" />
          Angular
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/vercel/nuxt?r=1">
          <img src="https://www.dotenv.org/assets-www/img/nuxt.svg" alt="Nuxt", width="20" />
          Nuxt
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/vercel/vite?r=1">
          <img src="https://www.dotenv.org/assets-www/img/vite.svg" alt="Vite", width="20" />
          Vite
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/integrations/slack?r=1">
          <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/partners/slack.png" alt="dotenv-vault + Slack", width="20" />
          Slack
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://dotenv.org/integrations">
          and more!
        </a>
      </td>
      <td align="left" valign="middle">
      </td>
      <td align="left" valign="middle">
      </td>
    </tr>
  </tbody>
</table>

Visit <a href="https://www.dotenv.org/docs/tutorials/integrations?r=1">tutorials/integrations</a> to learn more.

## Security

Learn more at

* [www.dotenv.org/security](https://www.dotenv.org/security?r=1)
* [www.dotenv.org/docs/security](https://www.dotenv.org/docs/security)

## 📖 Commands

Learn more at:

* [www.dotenv.org/docs](https://dotenv.org/docs)

```
$ dotenv-vault help
```

* [new](#new)
* [login](#login)
* [logout](#logout)
* [push](#push)
* [pull](#pull)
* [open](#open)
* [whoami](#whoami)
* [build](#build)
* [keys](#keys)
* [rotatekey](#rotatekey)
* [decrypt](#decrypt)
* [versions](#versions)
* [local](#local-build)
  * [local build](#local-build)   
  * [local decrypt](#local-decrypt)   
  * [local keys](#local-keys)   

### `new`

Create your project at Dotenv Vault.

Example:

```bash
$ npx dotenv-vault new
```

##### ARGUMENTS

*[DOTENV_VAULT]*

Set .env.vault identifier. Defaults to generated value.

```
$ npx dotenv-vault new vlt_6beaae5…
local:    Adding .env.vault (DOTENV_VAULT)... done
local:    Added to .env.vault (DOTENV_VAULT=vlt_6beaa...)
```

##### FLAGS

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

---

### `login`

Log in to dotenv-vault.

Example:

```bash
$ npx dotenv-vault login
```

##### ARGUMENTS

*[DOTENV_ME]*

Set .env.me identifier. Defaults to generated value.

```
$ npx dotenv-vault login me_00c7fa…
```

##### FLAGS

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault login -y
```

---

### `logout`

Log out of dotenv-vault.

Example:

```bash
$ npx dotenv-vault logout
```

##### FLAGS

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault logout -y
```

---

### `push`

Push `.env` securely.

Example:

```bash
$ npx dotenv-vault push
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to push to. Defaults to development

```
$ npx dotenv-vault push production
```

*[FILENAME]*

Set input filename. Defaults to .env for development and .env.{environment} for other environments

```
$ npx dotenv-vault push production .env.production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault push --dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault push -y
```

---

### `pull`

Pull `.env` securely.

Example:

```bash
$ npx dotenv-vault pull
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to pull from. Defaults to development

```
$ npx dotenv-vault pull production
```

*[FILENAME]*

Set output filename. Defaults to .env for development and .env.{environment} for other environments

```
$ npx dotenv-vault pull production .env.production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault pull --dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault pull -y
```

If you want to pull a specific version you can do so. For example,

```
npx dotenv-vault pull development@v14
```

---

### `open`

Open project page.

Example:

```bash
$ npx dotenv-vault open
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to open to. Defaults to development.

```
$ npx dotenv-vault open production
```

##### FLAGS

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault open -y
```

---

### `whoami`

Display the current logged in user.

Example:

```bash
$ npx dotenv-vault whoami
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault whoami dotenvMe=me_b1831e…
```

---

### `build`

Build .env.vault file.

Example:

```bash
$ npx dotenv-vault build
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault build dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault build -y
```

---

### `keys`

List .env.vault decryption keys.

Example:

```bash
$ npx dotenv-vault keys
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment. Defaults to all.

```
$ npx dotenv-vault keys production…
remote:   Listing .env.vault decryption keys... done
dotenv://:key_899..@dotenv.org/vault/.env.vault?environment=production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault keys dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault keys -y
```

---

### `rotatekey`

Rotate DOTENV_KEY.

Example:

```bash
$ npx dotenv-vault rotatekey production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault rotatekey dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault rotatekey -y
```

---

### `decrypt`

Decrypt .env.vault locally.

Example:

```bash
$ npx dotenv-vault decrypt dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development
```

##### ARGUMENTS

*[DOTENV_KEY]*

Set `DOTENV_KEY` to decrypt .env.vault. Development key will decrypt development, production will decrypt production, and so on.

```
$ npx dotenv-vault decrypt dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development
```

---

### `versions`

List version history.

Example:

```bash
$ npx dotenv-vault versions
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to check versions against. Defaults to development.

```
$ npx dotenv-vault versions production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault versions dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault versions -y
```

If you want to pull a specific version you can do so. For example,

```
npx dotenv-vault pull development@v14
```

---

### `local build`

Build .env.vault from local only

Example:

```bash
$ npx dotenv-vault local build
```

This will encrypt the contents of your `.env` file and any `.env.ENVIRONMENT` files you have locally into your `.env.vault` file.

### `local decrypt`

Decrypt .env.vault from local only

Example:

```bash
$ npx dotenv-vault local decrypt dotenv://:key_1234@dotenv.local/vault/.env.vault?environment=development
```

##### ARGUMENTS

*[DOTENV_KEY]*

Set `DOTENV_KEY` to decrypt .env.vault. Development key will decrypt development, production will decrypt production, and so on.

```
$ npx dotenv-vault local decrypt dotenv://:key_1234@dotenv.local/vault/.env.vault?environment=development
```

### `local keys`

List .env.vault local decryption keys from .env.keys file

Example:

```bash
$ npx dotenv-vault local keys
local:    Listing .env.vault decryption keys from .env.keys... done
 environment DOTENV_KEY
 ─────────── ────────────────────────────────────────────────────────────────────────────────────────────────────────
 develompent dotenv://:key_33ee..@dotenv.local/vault/.env.va…
 production  dotenv://:key_7038..@dotenv.local/vault/.env.va…
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set `ENVIRONMENT` to output a single environment's DOTENV_KEY.

```
$ npx dotenv-vault local keys development…
local:    Listing .env.vault decryption keys from .env.keys... done
dotenv://:key_a682c..@dotenv.local/vault/.env.vault?environment=development
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md)

## License

MIT
