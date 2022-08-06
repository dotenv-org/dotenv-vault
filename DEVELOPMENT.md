# Development README

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

## Testing

```
npm test
```

## Tarballs

* [https://dotenv-vault-assets.dotenv.org/](https://dotenv-vault-assets.dotenv.org/)
* [http://dotenv-vault.s3-website-us-west-1.amazonaws.com/](http://dotenv-vault.s3-website-us-west-1.amazonaws.com/)

```
npx oclif@3.0.1 pack tarballs
bash
env $(cat .env | xargs) npx oclif@3.0.1 upload tarballs
env $(cat .env | xargs) npx oclif@3.0.1 promote --version VERSION --sha SHA
```

## Publishing

Only for those with permission.

```
npm version patch
npm publish
```
