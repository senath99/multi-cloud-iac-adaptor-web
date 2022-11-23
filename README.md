# Experienz Web Portal

### Requirements

Node >= 14.x.x
AWS CLI > 2

### AWS Parameters

```bash
    # name of the profile
    export AWS_PROFILE=experienz
    export AWS_REGION=eu-west-2
```

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

### Tests

```bash
    # exporting CI=true so that tests are run with non watch mode.
    export CI=true
    # run the tests with coverage reports.
    npm run test -- --coverage --ci --watchAll=false
```

### Sonar Scanner

Please refer to [sonar-project.properties](./sonar-project.properties)

> Please note that if you want to run sonar scanner and publish to local SonarQube change the sonar host, key and project keys as required.

> If you want to run SonarQube locally please refer to: [Running SonarQube locally using Docker](https://github.com/Mitra-Sparks/dynamedics-devops/tree/master/sonarqube)

> Install Sonar Scanner locally by referring to: [Sonar Scanner Docs](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner)

```bash
    # run sonar scanner at project root
    sonar-scanner
    # for Windows
    sonar-scanner.bat
```
