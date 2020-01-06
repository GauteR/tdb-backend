FROM node:12
LABEL MAINTAINER Gaute Rønningen <rnngau@gmail.com>

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies for production
RUN yarn

# Bundle app source
COPY . .

# expose the default HTTPS port
EXPOSE 443

HEALTHCHECK --interval=30s --timeout=10s --start-period=1m CMD http_proxy="" https_proxy="" curl --fail http://${HOST-0.0.0.0}:${PORT:-443}/health || exit 1
CMD [ "node", "index.js"]
