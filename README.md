`dotenv-vault` is a cli to *sync .env files across machines, environments, and team members*.

[![NPM Version](https://img.shields.io/npm/v/dotenv-vault.svg?style=flat-square)](https://npmjs.org/package/dotenv-vault)

&nbsp;

> [!NOTE]
> dotenv-vault is a **paid only cloud service for syncing your .env files** (as of May 2025).
>
> *Looking for a free cloud-less alternative?* See my new product [dotenvx](https://github.com/dotenvx/dotenvx) – that lets you:
> - encrypt your .env files
> - commit them to code
> - and securely sync them over git

## 🌱 Install

It works with a single command. Run `npx dotenv-vault@latest push`.

```sh
npx dotenv-vault@latest push
```
```
remote:   Securely pushing (.env)... done
remote:   Securely pushed development (.env)
remote:   Securely built vault (.env.vault)
```

That's it. You securely synced your `.env` file. Next, tell your teammate to run `npx dotenv-vault@latest pull`

```sh
npx dotenv-vault@latest pull
```

Nice!

See further [usage](#%EF%B8%8F-usage) and [commands](#-commands).

## 🏗️ Usage

When you make a change to your `.env` file, push it up.

```bash
$ npx dotenv-vault@latest push
```

Commit your `.env.vault` file safely to code.

```bash
$ git add .env.vault
$ git commit -am "Add .env.vault"
$ git push
```

Now your teammate can pull the latest `.env` changes.

```bash
$ git pull
$ npx dotenv-vault@latest pull
```

That's it!

<a href="https://www.dotenv.org/docs/quickstart?r=1">Learn more about usage</a>

## 🚀 Deploying

Stop scattering your production secrets across multiple third-parties and tools. Instead, use an encrypted `.env.vault` file.

Generate your encrypted `.env.vault` file.

```bash
$ npx dotenv-vault@latest build
```

Fetch your production `DOTENV_KEY`.

```bash
$ npx dotenv-vault@latest keys production
remote:   Listing .env.vault decryption keys... done
dotenv://:key_1234…@dotenv.org/vault/.env.vault?environment=production
```

Set `DOTENV_KEY` on your server.

```bash
# heroku example
heroku config:set DOTENV_KEY=dotenv://:key_1234…@dotenv.org/vault/.env.vault?environment=production
```

Commit your `.env.vault` file safely to code and deploy.

```bash
$ git add .env.vault
$ git commit -am "Update .env.vault"
$ git push
$ git push heroku main # heroku example
```

That's it! On deploy, your `.env.vault` file will be decrypted and its secrets injected as environment variables – just in time.

<a href="https://www.dotenv.org/docs/quickstart?r=1">Learn more about deploying</a>

## 🌴 Manage Multiple Environments

After you've pushed your `.env` file, dotenv-vault automatically sets up multiple environments. Manage multiple environments with the included UI. [learn more](/docs/tutorials/environments)

```
$ npx dotenv-vault@latest open production
```

That's it! Manage your ci, staging, and production secrets from there.

Would you also like to pull your production `.env` to your machine? Run the command:

```
$ npx dotenv-vault@latest pull production
```

<a href="https://www.dotenv.org/docs/tutorials/environments?r=1">Learn more about environments</a>

## 📚 Examples

<table>
  <tbody>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/platforms/vercel">
          <img src="https://api.iconify.design/devicon/vercel.svg" alt="Vercel", width="20" />
          Vercel
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/platforms/heroku">
          <img src="https://api.iconify.design/skill-icons/heroku.svg" alt="Heroku", width="20" />
          Heroku
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/cis/github-actions">
          <img src="https://api.iconify.design/devicon/github.svg" alt="GitHub", width="20" />
          GitHub Actions
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/gitlab-ci">
          <img src="https://api.iconify.design/devicon/gitlab.svg" alt="GitLab", width="20" />
          GitLab CI/CD
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/platforms/netlify">
          <img src="https://api.iconify.design/skill-icons/netlify-light.svg" alt="Netlify", width="20" />
          Netlify
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/platforms/docker">
          <img src="https://api.iconify.design/skill-icons/docker.svg" alt="Docker", width="20" />
          Docker
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/express/docker-compose">
          <img src="https://api.iconify.design/skill-icons/docker.svg" alt="Docker Compose", width="20" />
          Docker Compose
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/cis/circleci">
          <img src="https://api.iconify.design/logos/circleci.svg" alt="CircleCI", width="20" />
          CircleCI
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/serverless/aws-lambda">
          <img src="https://api.iconify.design/logos/serverless.svg" alt="Serverless", width="20" />
          Serverless
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/railway">
          <img src="https://api.iconify.design/simple-icons/railway.svg" alt="Railway", width="20" />
          Railway
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/render">
          <img src="https://api.iconify.design/simple-icons/render.svg" alt="Render", width="20" />
          Render
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/travis-ci">
          <img src="https://api.iconify.design/simple-icons/travisci.svg" alt="Travis CI", width="20" />
          Travis CI
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/cis/google-cloud-build">
          <img src="https://api.iconify.design/devicon/googlecloud.svg" alt="Google Cloud", width="20" />
          Google Cloud
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/platforms/fly">
          <img src="https://api.iconify.design/logos/fly-icon.svg" alt="Fly.io", width="20" />
          Fly.io
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/addons/slack">
          <img src="https://api.iconify.design/devicon/slack.svg" alt="dotenv-vault + Slack", width="20" />
          Slack
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/buddy">
          <img src="https://api.iconify.design/logos/buddy.svg" alt="Buddy", width="20" />
          Buddy
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/cloud66">
          <img src="https://api.iconify.design/simple-icons/cloud66.svg" alt="Cloud66", width="20" />
          Cloud66
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/digital-ocean">
          <img src="https://api.iconify.design/devicon/digitalocean.svg" alt="Digital Ocean", width="20" />
          Digital Ocean
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/dagger">
          <img src="https://dagger.io/img/logo-alt-2.svg" alt="Dagger", width="20" />
          Dagger
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/bitbucket">
          <img src="https://api.iconify.design/devicon/bitbucket.svg" alt="Bitbucket", width="20" />
          Bitbucket
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs">
          <img src="https://api.iconify.design/devicon/nodejs.svg" alt="Node.js", width="20" />
          Node.js
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/express">
          <img src="https://api.iconify.design/devicon/express.svg" alt="Express", width="20" />
          Express
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/nextjs">
          <img src="https://api.iconify.design/devicon/nextjs.svg" alt="NextJS", width="20" />
          NextJS
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/remix">
          <img src="https://api.iconify.design/skill-icons/remix-dark.svg" alt="Remix", width="20" />
          Remix
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/astro/netlify">
          <img src="https://api.iconify.design/devicon/astro.svg" alt="Astro", width="20" />
          Astro
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/rails">
          <img src="https://api.iconify.design/logos/rails.svg" alt="Rails", width="20" />
          Rails
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/ruby">
          <img src="https://api.iconify.design/logos/ruby.svg" alt="Ruby", width="20" />
          Ruby
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/sinatra/heroku">
          <img src="https://api.iconify.design/logos/sinatra.svg" alt="Sinatra", width="20" />
          Sinatra
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/flask/heroku">
          <img src="https://api.iconify.design/devicon/flask.svg" alt="Flask", width="20" />
          Flask
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/python">
          <img src="https://api.iconify.design/devicon/python.svg" alt="Python", width="20" />
          Python
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/integrations/supabase/nodejs?r=1">
          <img src="https://api.iconify.design/devicon/supabase.svg" alt="Supabase", width="20" />
          Supabase
        </a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/languages/nodejs/pulumi">
          <img src="https://api.iconify.design/vscode-icons/file-type-pulumi.svg" alt="Pulumi", width="20" />
          Pulumi
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/angular/vercel">
          <img src="https://api.iconify.design/devicon/angular.svg" alt="Angular", width="20" />
          Angular
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/nuxtjs">
          <img src="https://api.iconify.design/logos/nuxt-icon.svg" alt="Nuxt", width="20" />
          Nuxt
        </a>
      </td>
      <td align="left" valign="middle">
        <a href="https://www.dotenv.org/docs/frameworks/vite/vercel">
          <img src="https://api.iconify.design/devicon/vite.svg" alt="Vite", width="20" />
          Vite
        </a>
      </td>
    </tr>
  </tbody>
</table>

<a href="https://www.dotenv.org/docs/">See more integration guides</a>

## 📖 Commands

```
$ npx dotenv-vault@latest help
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

### `new`

Create your project at Dotenv Vault.

Example:

```bash
$ npx dotenv-vault@latest new
```

##### ARGUMENTS

*[DOTENV_VAULT]*

Set .env.vault identifier. Defaults to generated value.

```
$ npx dotenv-vault@latest new vlt_6beaae5…
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
$ npx dotenv-vault@latest login
```

##### ARGUMENTS

*[DOTENV_ME]*

Set .env.me identifier. Defaults to generated value.

```
$ npx dotenv-vault@latest login me_00c7fa…
```

##### FLAGS

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest login -y
```

---

### `logout`

Log out of dotenv-vault.

Example:

```bash
$ npx dotenv-vault@latest logout
```

##### FLAGS

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest logout -y
```

---

### `push`

Push `.env` securely.

Example:

```bash
$ npx dotenv-vault@latest push
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to push to. Defaults to development

```
$ npx dotenv-vault@latest push production
```

*[FILENAME]*

Set input filename. Defaults to .env for development and .env.{environment} for other environments

```
$ npx dotenv-vault@latest push production .env.production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault@latest push --dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest push -y
```

---

### `pull`

Pull `.env` securely.

Example:

```bash
$ npx dotenv-vault@latest pull
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to pull from. Defaults to development

```
$ npx dotenv-vault@latest pull production
```

*[FILENAME]*

Set output filename. Defaults to .env for development and .env.{environment} for other environments

```
$ npx dotenv-vault@latest pull production .env.production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault@latest pull --dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest pull -y
```

If you want to pull a specific version you can do so. For example,

```
npx dotenv-vault@latest pull development@v14
```

---

### `open`

Open project page.

Example:

```bash
$ npx dotenv-vault@latest open
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to open to. Defaults to development.

```
$ npx dotenv-vault@latest open production
```

##### FLAGS

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest open -y
```

---

### `whoami`

Display the current logged in user.

Example:

```bash
$ npx dotenv-vault@latest whoami
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault@latest whoami dotenvMe=me_b1831e…
```

---

### `build`

Build .env.vault file.

Example:

```bash
$ npx dotenv-vault@latest build
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault@latest build dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest build -y
```

---

### `keys`

List .env.vault decryption keys.

Example:

```bash
$ npx dotenv-vault@latest keys
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment. Defaults to all.

```
$ npx dotenv-vault@latest keys production…
remote:   Listing .env.vault decryption keys... done
dotenv://:key_899..@dotenv.org/vault/.env.vault?environment=production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault@latest keys dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest keys -y
```

---

### `rotatekey`

Rotate DOTENV_KEY.

Example:

```bash
$ npx dotenv-vault@latest rotatekey production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault@latest rotatekey dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest rotatekey -y
```

---

### `decrypt`

Decrypt .env.vault locally.

Example:

```bash
$ npx dotenv-vault@latest decrypt dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development
```

##### ARGUMENTS

*[DOTENV_KEY]*

Set `DOTENV_KEY` to decrypt .env.vault. Development key will decrypt development, production will decrypt production, and so on.

```
$ npx dotenv-vault@latest decrypt dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development
```

---

### `versions`

List version history.

Example:

```bash
$ npx dotenv-vault@latest versions
```

##### ARGUMENTS

*[ENVIRONMENT]*

Set environment to check versions against. Defaults to development.

```
$ npx dotenv-vault@latest versions production
```

##### FLAGS

*-m, --dotenvMe*

Pass .env.me (DOTENV_ME) credential directly (rather than reading from .env.me file)

```
$ npx dotenv-vault@latest versions dotenvMe=me_b1831e…
```

*-y, --yes*

Automatic yes to prompts. Assume yes to all prompts and run non-interactively.

```
$ npx dotenv-vault@latest versions -y
```

If you want to pull a specific version you can do so. For example,

```
npx dotenv-vault@latest pull development@v14
```

## ❓ FAQ

### Why is the `.env.vault` file not decrypting my environment variables successfully?

First, make sure you are using `dotenv@16.1.0` or greater. (If you are using a different language make sure you have installed one of its [libraries](#what-languages-does-this-work-with).)

Second, test decryption is working locally.

```bash
$ npx dotenv-vault@latest decrypt dotenv://:key_1234..@dotenv.local/vault/.env.vault?environment=production
# outputs environment variables
```

Third, test decryption on boot is working locally.

```bash
$ DOTENV_KEY='dotenv://:key_1234..@dotenv.local/vault/.env.vault?environment=production' npm start
# boots your app with production envs
```

### Should I commit my `.env.vault` file?

Yes. It is safe and recommended to do so. DO commit your `.env.vault` file to code. DO NOT commit your `.env` file. The `.env.vault` file contains ciphertext generated using AES-256. AES-256 is trusted by the US Government to transmit top-secret information and has a brute-force timescale of about a billion years.

### I accidentally leaked my `DOTENV_KEY`, what can I do? 

Does that attacker also have access to your `.env.vault` file?

* No: good, the attacker cannot do any damage. They need both the `DOTENV_KEY` and `.env.vault` file to access your secrets. This extra layer of security sets the `.env.vault` file apart as a superior solution to other SecretOps solutions.
* Yes: IMMEDIATELY start rotating your secrets at your third-party API providers. This scenario would be the same no matter what SecretOps solution you use.

After completing the above, rotate your `DOTENV_KEY` using the [rotatekey](#rotatekey) command, rebuild your `.env.vault` file, and redeploy.

### Is it safe to store my secrets with dotenv-vault?

It safer than scattering your secrets across multiple cloud providers. Those providers are focused on code deployment and server performance over secrets security.[1]

Dotenv Vault's singular focus is secrets security, and as a result we go to great lengths to make sure your secrets are safe. Afterall, we keep our secrets here too.[2]

* [[1] CircleCI Breach](https://techcrunch.com/2023/01/05/circleci-breach/)
* [[2] Security at Dotenv Vault](https://www.dotenv.org/security)

### What languages does this work with?

The `.env.vault` file and its encryption algorithm is language-agnostic so technically it works with any language. We've built convenience libraries for it in a handful of languages and are adding more quickly.

* [Go](https://github.com/dotenv-org/godotenvvault)
* [Kotlin](https://github.com/dotenv-org/dotenv-vault-kotlin)
* [NodeJS](https://github.com/motdotla/dotenv)
* [PHP](https://github.com/dotenv-org/phpdotenv-vault)
* [Python](https://github.com/dotenv-org/python-dotenv-vault)
* [Ruby](https://github.com/dotenv-org/dotenv-vault-ruby)

### Migrating to Dotenvx

With dotenvx you put your development, staging, ci, and production secrets IN your code - as encrypted `.env.*` files. So for example, to do production you would

1. Create `.env.production` with `HELLO=production` (or in dotenv-vault's case `npx dotenv-vault@latest pull production`)
2. Run `dotenvx encrypt -f .env.production` to encrypt it
3. Commit that to code

Then when deploying your codebase you put `dotenvx run --` out front of your run command.

1. Add `dotenvx run -- yourstartcommand`
2. Set `DOTENV_PRIVATE_KEY_PRODUCTION` on the server
3. On boot `dotenvx run` will read the private key and use it to decrypt and inject your secrets just in time as environment variables

Here's a [quickstart guide](https://dotenvx.com/docs/quickstart#add-encryption)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md)

## License

MIT
