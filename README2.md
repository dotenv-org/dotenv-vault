# dotenv-vault

Dotenv Vault extends the proven & trusted foundation of [dotenv](https://github.com/motdotla/dotenv), adding new standards <strong>.env.me</strong> and <strong>.env.vault</strong>. Together, these new standards let you sync and deploy your .env files – quickly & securely. Stop sharing them over insecure channels like Slack and email, and never lose an important .env file again. All from the same people that pioneered dotenv.

## Install

```bash
# install locally (recommended)
npm install dotenv-vault --save
```

## Usage

Dotenv Vault extends `.env` so a much of this will purposely be familiar with a few new commands to learn.

* `.env` holds your project's development secrets. It should NEVER be committed to code.
* `.env.me` authenticates you to sync your .env file. It should NEVER be committed to code.
* `.env.vault` is a local encrypted vault of your secrets across all environments. It can and SHOULD be committed safely to code.

### Setup .env

Create a `.env` file in the root of your project:

```dosini
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

As early as possible in your application, import and configure dotenv-vault:

```javascript
require('dotenv-vault').config()
console.log(process.env) // remove this after you've confirmed it working
```

That's it. `process.env` now has the keys and values you defined in your `.env` file:

```javascript
require('dotenv-vault').config()

...

s3.getBucketCors({Bucket: process.env.S3_BUCKET}, function(err, data) {})
```

For the next steps, you will need your own [Dotenv Account](https://dotenv.org/signup).

### Set up .env.me & .env.vault

Usage is similar to git. Run the command:

```bash
npx dotenv-vault new
```

Follow those instructions and then run:

```bash
npx dotenv-vault login
```

Then run push and pull:

```bash
npx dotenv-vault push
npx dotenv-vault pull
```

Great! You just synced your .env file. Commit your `.env.vault` file to code, and tell your teammates to run `npx dotenv-vault pull`.

## Manage Environments

Dotenv Vault comes with 4 environments by default - development, ci, staging, and production.

You can push and pull from these environments as well.

Let's set up your production environment.

```bash
npx dotenv-vault open production
```

Edit the values and save.

## Deploy

You need to fully set up your .env.vault file next. Run the command:

```bash
npx dotenv-vault build
```

```bash
npx dotenv-vault buildkeys
```

That's it!

## Add Teammates

## Manage Access

## 
