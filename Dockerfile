FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Install dependencies
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
RUN npm ci
COPY . .
RUN npm run ci
