# dotenv-vault

<img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt="dotenv-vault" align="right" width="200" />

**Sync .env files.** Stop sharing them over insecure channels like Slack and email and never lose an important .env file again.

dotenv-vault extends the proven & trusted foundation of [dotenv](https://github.com/motdotla/dotenv) with syncing, multiple environments, and integration wherever you develop and deploy - all using a new standard `.env.vault` file.

<strong><a href="https://www.youtube.com/watch?v=z-lBjxfhWeY" target="_blank">Watch the 1 minute video</a></strong>

[![Version](https://img.shields.io/npm/v/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![Downloads](https://img.shields.io/npm/dt/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)

* [Usage](#usage)
* [Multiple Environments](#multiple-environments)
* [Integrations](#integrations)
* [How It Works](#how-it-works)
* [Commands](#commands)

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

That's it! You synced your .env file.

Visit [dotenv.org/docs](https://www.dotenv.org/docs/tutorials/sync?r=1) for a complete getting started guide.

## Multiple Environments

After you've pushed your .env file, you can manage your secrets across multiple environments. Open an environment to view and edit its environment variables.

```bash
$ npx dotenv-vault open production
```

Edit those values. Would you also like to pull your production .env to your machine? Run the command:

```
$ npx dotenv-vault pull production
```

Visit [dotenv.org/docs/tutorials/environments](https://www.dotenv.org/docs/tutorials/environments?r=1) to learn more.

## Integrations

Dotenv Vault integrates everywhere you already deploy your code.

Run the build command to generate your encrypted .env.vault file, commit that safely to code, and deploy.

```
$ npx dotenv-vault build
$ git commit -am "Add .env.vault"
$ git push
```

There's nothing else like it. [Node.JS](https://github.com/dotenv-org/dotenv-vault-core), [Ruby](https://gitub.com/dotenv-org/dotenv-vault-ruby), and [Python](https://github.com/dotenv-org/python-dotenv-vault) supported – more languages coming soon. [Request a language](https://github.com/dotenv-org/dotenv-vault/discussions/95)

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

## How It Works

Below is a high level overview of how dotenv-vault works. You can also learn more at [docs](https://dotenv.org/docs)[docs] and [security](https://dotenv.org/security).

###### Step 1
#### npx dotenv-vault push
You run npx dotenv-vault push. Your request is started.

###### Step 2
#### Encrypted Connection
Your .env file is encrypted and sent securely over SSL to Dotenv's in-memory servers.

###### Step 3
#### Dotenv Servers
This encrypted payload is decrypted and briefly held in memory to complete the next steps. Afterward, the memory is flushed. Rest assured the decrypted version is never peristed to Dotenv systems.

###### Step 4
#### Parsing
Your .env file is parsed line by line - in memory.

Note: There are minor differences between dotenv parsers across various languages and frameworks. So far Dotenv Vault handles 100% of these, and we continue to add test cases to cover all edge cases.

###### Step 5
#### Secret Extraction
Each key/value pair (and any comments) are extracted - in memory.

###### Step 6
#### Secret Division
The secret is divided into its separate key and value. This is by design. They will be stored in separate databases for added security. This way if an attacker somehow gained access to one database they would not be able to make sense of the data - having only half the puzzle.

###### Step 7
#### AES-GCM Encryption
The KEY is encrypted. The VALUE is encrypted. They are encrypted with different master encryption keys. This way if an attacker somehow gained access to the VALUE decryption key they would find the data useless. They would not know if the secret belonged to Twilio or to AWS.

Encryption uses the AES-GCM algorithm. It is:

* well-studied
* NIST recommended
* an IETF standard
* fast thanks to a dedicated instruction set

Additionally, all master encryption keys are rotated on an unpublished schedule, further adding to the level of security.

###### Step 8
#### Tokenization
The encrypted VALUE is sent to Dotenv Vault for safe storage. A token is returned as an identifier. The token is used in the next step for mapping the KEY to the VALUE for later secure-read operations.

Multiple security measures go into the Vault. They include but are not limited to:

* Separate datastore from the application database
* Not accessible via the internet and all external connections are prevented
* Encrypted clients are required and these clients have to go through the application - which has its own additional layers of encryption
* There are stricter TLS requirements for connecting to the Vault. TLS 1.0 cannot be used to connect.
* The secrets stored in the Vault are not just encrypted at the datastore level. They are also encrypted at each datastore entry as you saw in the prior step(s).

###### Step 9
#### Store Key Part with Token
Lastly, the encrypted KEY and token (representing the encrypted VALUE) are placed in an envelope and stored together in the application database.

###### Step 10
#### Success 201
A success message is returned to the developer.

<p align="center">
  Learn more at <a href="https://www.dotenv.org/security?r=1">dotenv.org/security</a>
</p>

## Commands

Below are a list of dotenv-vault cli commands. You can also learn more on the [docs page](https://dotenv.org/docs).

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
* [versions](#versions)

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
