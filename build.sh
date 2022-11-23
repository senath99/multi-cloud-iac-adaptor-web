#!/bin/bash

set -eu

EXEC=$(realpath "${0#./}")
EXEC_BASE="${EXEC%/*}"
EXEC_NAME=$(basename "$EXEC")
EXEC_PARENT="${EXEC_BASE%/*}"

# defines log function
log() {
  local message="$1"
  printf '%b\n' "$message"
}

# displays usage information
usage() {
  printf %s "Usage: $EXEC_NAME [OPTIONS]

  Provides an interface to build experienz web components for different environments.

  [OPTIONS]
    -b|s|d  - [required] Used to manage required action, 'build', 'start' or 'deploy'.
    -e      - [required] Used to define the environment.
" 1>&2
  exit $?
}

NUMARGS=$#
if [ $NUMARGS -eq 0 ]; then
  usage
fi

construct_env_file() {
  echo "Constructing the .env file for $ENVIRONMENT environment..."
  unameOut="$(uname -s)"
  case "${unameOut}" in
    Linux*)     SSM_PARAM_NAME="/experienz/${ENVIRONMENT}/web/";;
    Darwin*)    SSM_PARAM_NAME="/experienz/${ENVIRONMENT}/web/";;
    CYGWIN*)    SSM_PARAM_NAME="//experienz\\${ENVIRONMENT}\\web\\";;
    MINGW*)     SSM_PARAM_NAME="//experienz\\${ENVIRONMENT}\\web\\";;
    *)          SSM_PARAM_NAME="/experienz/${ENVIRONMENT}/web/"
  esac
  aws ssm get-parameters-by-path --with-decryption --path $SSM_PARAM_NAME | jq -r ".Parameters[] | (.Name | sub(\"/experienz/${ENVIRONMENT}/web/\";\"REACT_APP_\"))  + \"=\" + (.Value)" > $EXEC_BASE/.env
}

build() {
  if [[ $ENVIRONMENT != "dev" ]]; then
    construct_env_file
    echo "Building the web components for $ENVIRONMENT environment..."
    npm run build
  else
    echo "Environment has to be something other than dev (i.e. test or prod)!"
  fi
}

deploy() {
  if [[ $ENVIRONMENT != "dev" ]]; then
    REACT_APP_CF_ID=""
    echo "Deploying the web components for $ENVIRONMENT environment..."
    construct_env_file
    source $EXEC_BASE/.env
    echo "Copying files to S3 bucket ${REACT_APP_S3_URL}..."
    aws s3 cp build s3://${REACT_APP_S3_URL}/ --recursive
    if [ -n "${REACT_APP_CF_ID}" ]; then
      echo "Clearing cache for distribution: ${REACT_APP_CF_ID}"
      aws cloudfront create-invalidation \
        --distribution-id ${REACT_APP_CF_ID} \
        --paths "/*"
    fi
  else
    echo "Environment has to be something other than dev (i.e. test or prod)!"
  fi
}

start() {
  # only support test and dev to be run with environment values in .env.
  if [[ $ENVIRONMENT == "test" ]]; then
    construct_env_file
  fi
  echo "Running the web components for $ENVIRONMENT environment..."
  npm start
}

START=""
BUILD=""
DEPLOY=""
ENVIRONMENT="dev"

while getopts ":sbde:" ARG; do
  case "${ARG}" in
    s)  START=1 ;;
    b)  BUILD=1 ;;
    d)  DEPLOY=1 ;;
    e)  ENVIRONMENT=$OPTARG ;;
    \?)
        echo "Option not allowed."
        usage
        ;;
    *) usage ;;
  esac
done

shift $((OPTIND-1))  #This tells getopts to move on to the next argument.

if [ -n "${START}" ]; then
    start
elif [ -n "${BUILD}" ]; then
    build
elif [ -n "${DEPLOY}" ]; then
    deploy
else
    log "Unknown execution Option."
fi