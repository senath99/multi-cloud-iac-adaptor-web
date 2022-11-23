# Experienz Client Registration

### Requirements

Node >= 14.x.x
AWS CLI > 2

### Install

```bash
    # run at root folder.
    npm install
```

### Build

```bash
    # only for test and prod
    ./build.sh -b -e {environment}
```

### Deploy

```bash
    # only for test and prod
    ./build.sh -d -e {environment}
```

### Start

```bash
    # only for dev primarily. Can be used for test environment too.
    ./build.sh -s -e {environment}
```

> Start is only supposed to be run against dev and test environment(s).

> This script generates a .env file based on the environment, using SSM internally.

> Required AWS credentials should be present to fetch SSM parameters and copy build artifacts to S3 bucket.

### Running Locally

```bash
    # install dependencies.
    npm install
    # only for dev primarily. Can be used for test environment too.
    ./build.sh -s -e dev
    # this will pick the default .env file.
```
