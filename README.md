# @jeff-tian/mongo-csv

> Export mongodb collections to csv files

[![Git commit with emojis!](https://img.shields.io/badge/gitmoji-git%20commit%20with%20emojis!-red.svg)](https://gitmoji.js.org)
[![Build Status](https://travis-ci.com/Jeff-Tian/mongo-csv.svg?branch=master)](https://travis-ci.com/Jeff-Tian/mongo-csv)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/@jeff-tian/mongo-csv.svg)](https://badge.fury.io/js/@jeff-tian/mongo-csv)
![Dependency Status](https://david-dm.org/jeff-tian/mongo-csv.svg)
![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_mongo-csv)](https://sonarcloud.io/dashboard?id=Jeff-Tian_mongo-csv)

## Prerequisites

- `node` and `npm` installed

## Installation

```shell
npm install mongo-csv --global
```

## Typical Usage

```shell
mongo-csv config --write=true
# change your config (mongodb connection uri, etc)
mongo-csv export
ls # your csv files there
```

## Why

There are already some command line tools for that, why reinvent the wheel?

I found it's hard to install the other client tools, especially on some `alpine` containers. But it's easy to run
`npm instal` on
those
containers which installed `nodejs` and especially for those `nodejs` containers.

There is a similar one `https://github.com/rouanw/mongo-csv` and is almost what I need but it's not that easy to
configure the mongodb connection uri. I mean I just want to configure a simple connection string. But all those
tools in the world need to configure `port`, `username`, `password` separately, I hate them.

- **Roto 3T**: Can't configure the replica set directly.
- **Mongo Monkey**: need to configure `port` separately and can't configure the replicaset either: https://github.com/mbahoshy/mongo-monkey/issues/6

So I come to this step to write a tool by myself.
