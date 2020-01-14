# @jeff-tian/mongo-csv

> Export mongodb collections to csv files

[![Git commit with emojis!](https://img.shields.io/badge/gitmoji-git%20commit%20with%20emojis!-red.svg)](https://gitmoji.js.org)
[![Build Status](https://travis-ci.com/Jeff-Tian/mongo-csv.svg?branch=master)](https://travis-ci.com/Jeff-Tian/mongo-csv)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_mongo-csv)](https://sonarcloud.io/dashboard?id=Jeff-Tian_mongo-csv)

## Prerequisites

- `kubectl` installed
- `k8s-config` folder in home directory, for example:

```pre
~
 |-- k8s-config
       |-- hangzhou
              |-- config
       |-- beijing
              |-- config
```

## Installation

```shell
npm install mongo-csv --global
```

## Usage

```shell
# full usage:
mongo-csv switch --cluster=hangzhou --namespace=test

# switch namespace only without change cluster:
mongo-csv s --namespace=stage
```

## How

- move the related `config` file into `~/.kube`
- execute `kubectl config set-context $(kubectl config current-context) --namespace=<namespace>`
