# Encrypt Node

## Description

Practicing using cyphers, buffers and encoding to create a script that can encrypt and decrypt text.

## Copy example.env

```
cp example.env .env
```

## Test

```
npm test
```

## Encrypt File "foo" (included)

```
npm run enc
```

## Decrypt File "foo" (included)

```
npm run dec
```

## Generate three random keys to choose from for aes-256-gcm

```
npm run gen-key
```

## Add encFile.js and decFile.js to .zshrc or .bashrc

```.zshrc
alias decf='node ~<path>/decFile.js'
alias encf='node ~<path>/encFile.js'
```

Then you can run:

```zsh

encf <path to utf-8 encoded file> <aes-256-gcm-key or leave blank to use key from .env>
decf <path to utf-8 encoded file> <aes-256-gcm-key or leave blank to use key from .env>

```
