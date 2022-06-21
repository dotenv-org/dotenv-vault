[![using dotenv](https://badge.dotenv.org/using.svg?r=1)](https://www.dotenv.org/r/github.com/motdotla/dotenv?r=1) [![fork with dotenv-vault](https://badge.dotenv.org/fork.svg?r=1)](https://vault.dotenv.org/project/vlt_0a2981c4dcad3981c18c30e9a86a49c7697ba52c589b774e49686f611fe597aa/example)

# dotenv-vault

<img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/dotenv-vault.png" alt="dotenv-vault" align="right" width="120" />

Dotenv Vault securely syncs secrets and app configuration across your machines, environments, and team members. Stop sharing .env files over insecure channels like Slack and email - from the same people that pioneered [dotenv](https://github.com/motdotla/dotenv).

[![Version](https://img.shields.io/npm/v/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![Downloads](https://img.shields.io/npm/dt/dotenv-vault.svg)](https://npmjs.org/package/dotenv-vault)
[![License](https://img.shields.io/npm/l/dotenv-vault.svg)](https://github.com/dotenv-org/dotenv-vault/blob/master/package.json)
[![Featured on Openbase](https://badges.openbase.com/js/featured/dotenv-vault.svg?token=rF2f+2Z47SSdf5TjTnEBUAR6ZJS1vQaqcTLdu7pR70s=)](https://openbase.com/js/dotenv-vault?utm_source=embedded&amp;utm_medium=badge&amp;utm_campaign=rate-badge)

---

![usage animation](https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/dotenv-vault.gif)

## Works With

Works with any [dotenv library](https://dotenv.org/libraries?r=1) and integrates into most infrastructure (and growing).

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

Usage is easy! Run the command:

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

Read our [security statement](https://www.dotenv.org/security?r=1).

💡 **ProTip!** Append @latest to dotenv-vault to always run the latest version. For example: `npx dotenv-vault@latest push`. (otherwise, npx caches the first version it encounters on your machine)

## How It Works

Dotenv Vault holds your secrets in a secure and sophisticated way. [Learn more](https://dotenv.org/vault?r=1#how-it-works)

* **Step 1** You run <code>npx dotenv-vault push</code>. The request is started.
* **Step 2** The .env file is encrypted and sent securely over SSL to Dotenv's in-memory servers.
* **Step 3** This encrypted payload is decrypted and briefly held in memory to complete the next steps. Afterward, the memory is flushed. Rest assured the decrypted version is never peristed to Dotenv systems.
* **Step 4** The .env file is parsed line by line - in memory. Note: There are some differences between dotenv parsers across various languages and frameworks. So far Dotenv Vault handles these 100%, and we continue to add test cases to cover all edge cases.
* **Step 5** Each key/value pair (and any comments) are extracted - in memory.
* **Step 6** The secret is divided into its separate key and value. This is by design. They will be stored in separate databases for added security. This way if an attacker somehow gained access to one database they would not be able to make sense of the data - having only half of the puzzle.
* **Step 7** The <code>KEY</code> is encrypted. The <code>VALUE</code> is encrypted. They are encrypted with different master encryption keys. This way if an attacker somehow gained access to the <code>VALUE</code> decryption key they would find the data useless. They would not know if the secret belonged to Twilio or to AWS. **Encryption uses the AES-GCM algorithm.** It is:
  * well-studied
  * NIST recommended
  * an IETF standard
  * fast thanks to a dedicated instruction set
  * Additionally, all master encryption keys are rotated on an unpublished schedule, further adding to the level of security.
* **Step 8** The encrypted <code>VALUE</code> is sent to Dotenv Vault for safe storage. A token is returned as an identifier. The token is used in the next step for mapping the <code>KEY</code> to the <code>VALUE</code> for later secure-read operations. **Multiple security measures go into the Vault.** They include but are not limited to: 
  * Separate datastore from the application database
  * Not accessible via the internet and all external connections are prevented
  * Encrypted clients are required and these clients have to go through the application - which has its own additional layers of encryption
  * There are stricter TLS requirements for connecting to the Vault. TLS 1.0 cannot be used to connect.
  * The secrets stored in the Vault are not just encrypted at the datastore level. They are also encrypted at each datastore entry as you saw in the prior step(s).
* **Step 9** Lastly, the encrypted <code>KEY</code> and token (representing the encrypted <code>VALUE</code>) are placed in an envelope and stored together in the application database.
* **Step 10** success message is returned to the user.

[Learn more](https://dotenv.org/vault?r=1#how-it-works)

## Commands

### `dotenv-vault new [dotenvVault]`

Create your project at Dotenv Vault.

Example:

```bash
$ dotenv-vault new
```

#### Arguments

##### [dotenvVault]

Set .env.vault identifier. Defaults to generated value.

Example:

```bash
$ dotenv-vault new vlt_a5ue8…
# set .env.vault project identifier to vlt_a5ue8…
```

#### Options

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault new -y
# skips over prompt for permission to open browser window
```

### `dotenv-vault login [dotenvMe]`

Authenticate your project at Dotenv Vault.

Example:

```bash
$ dotenv-vault login
```

#### Arguments

##### [dotenvMe]

Set .env.me credential. Defaults to generated value.

Example:

```bash
$ dotenv-vault login me_13b33…
# set .env.me credential to me_13b33…
```

#### Options

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault login --yes
# skips over prompt for permission to open browser window
```

### `dotenv-vault push [environment] [filename]`

Push your `.env` file securely to Dotenv Vault

Example:

```bash
$ dotenv-vault push
# pushes local .env to remote development
```

#### Arguments

##### [environment]

Example:

```bash
$ dotenv-vault push staging
# pushes local .env.staging to remote staging environment
```

##### [filename]

Set input filename. Defaults to .env.

Example:

```bash
$ dotenv-vault push staging .env.stag
# pushes .env.stag to remote staging environment
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault push development --dotenvMe=me_1234
# pushes local .env to remote development
```

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault push --yes
# skips over prompt for permission to open browser window
```

### `dotenv-vault pull [environment] [filename]`

Pulls your development|staging|ci|production environment(s) to your machine.

Example:

```bash
$ dotenv-vault pull
# pulls remote development envs to .env
```

#### Arguments

##### [environment]

Pull .env.ci, .env.staging, and .env.production

Example:

```bash
$ dotenv-vault pull staging
# pulls remote staging envs to .env.staging
```

##### [filename]

Set output filename. Defaults to .env for development and .env.{environment} for other environments. Exception: When using <code>DOTENV_IT</code> tokens it defaults to `.env` for all environments.

Example:

```bash
$ dotenv-vault pull production .env
# pulls remote production envs to .env
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault pull staging --dotenvMe=me_1234
# pulls remote staging envs to .env.staging

$ dotenv-vault pull production .env --dotenvMe=me_1234
# pulls remote production envs to .env
```

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault pull -y
# skips over prompt for permission to open browser window
```

### `dotenv-vault open`

Open your project in the UI at Dotenv Vault.

Example:

```bash
$ dotenv-vault open
```

#### Options

##### -y, --yes

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

Examples:

```bash
$ dotenv-vault open -y
# skips over prompt for permission to open browser window
```

### `dotenv-vault whoami`

Display the current logged in user

Example:

```bash
$ dotenv-vault whoami
```

#### Options

##### --dotenvMe

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-vault whoami --dotenvMe=me_1234
```

### `dotenv-vault help [command]`

Display help for dotenv-vault commands.

```
USAGE
  $ dotenv-vault help [command]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

Example:

```
$ dotenv-vault help push
```

## Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Development Guide

Fork and clone the repo. Use `./bin/dev` to run local development commands.

```
./bin/dev new
./bin/dev push
./bin/dev pull
# etc
```

If you need to send the request to a different vault url, modify your command(s) to the following.

```
NODE_TLS_REJECT_UNAUTHORIZED=0 DOTENV_API_URL=https://vault.dotenv.development ./bin/dev
```

Note that dotenv-vault uses [oclif](https://oclif.io/).

### Testing

```
npm test
```

### Tarballs

* [https://dotenv-vault-assets.dotenv.org/](https://dotenv-vault-assets.dotenv.org/)
* [http://dotenv-vault.s3-website-us-west-1.amazonaws.com/](http://dotenv-vault.s3-website-us-west-1.amazonaws.com/)

### Publishing

Only for those with permission.

```
npm version patch
npm publish
```

Other notes.

```
npx oclif@3.0.1 pack tarballs
bash
env $(cat .env | xargs) npx oclif@3.0.1 upload tarballs
env $(cat .env | xargs) npx oclif@3.0.1 promote --version VERSION --sha SHA
```

## CHANGELOG

See [CHANGELOG.md](CHANGELOG.md)
