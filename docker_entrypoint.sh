#!/bin/bash
if [[ ! -d /var/www/app/node_modules ]]; then
    (cd /var/www/app && npm install --loglevel=error)
fi
# mounted volumes on local, for static server
# we need to build
if [ "$ENVIRONMENT" == "local" ]; then
    (
        cd /var/www/app || return
        npm run build
    )
fi
command=${*:-"http-server --cors"}
echo "running command: ${command}"
eval "${command}"
