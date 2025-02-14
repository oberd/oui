FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Install dependencies
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
RUN npm install
COPY . .
RUN npm ci
RUN npm run ci
