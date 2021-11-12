FROM node:17-alpine

ENV NODE_ENV production

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY /dist ./

# install dependencies and build packages
RUN yarn install --frozen-lockfile --pure-lockfile --non-interactive --production --ignore-scripts

CMD ["node", "./index.js"]