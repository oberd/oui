FROM node:14.7-buster as dev
RUN npm i -g http-server --loglevel=error
WORKDIR /var/www/app
ENTRYPOINT ["/var/www/app/docker_entrypoint.sh"]

FROM dev as ci
# AWS cli
RUN apt-get update \
    && apt-get install -y --no-install-recommends awscli \
    && rm -rf /var/lib/apt/lists/*
COPY package.json .
COPY package-lock.json .
RUN npm install --loglevel=error
COPY . /var/www/app
RUN npm run ci