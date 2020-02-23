FROM node:12

RUN npm i -g nodemon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies for production
RUN yarn

EXPOSE 8080

CMD ["nodemon"]
