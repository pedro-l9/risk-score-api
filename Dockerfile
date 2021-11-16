FROM node:17-alpine AS builder

WORKDIR /usr/app

COPY . .
RUN yarn

FROM node:17-alpine AS runner

ENV NODE_ENV production
ENV PORT 8080

WORKDIR /usr/app

COPY --from=builder ./usr/app/dist ./
COPY package.json yarn.lock ./

# install dependencies and build packages
RUN yarn install --frozen-lockfile --pure-lockfile --non-interactive --production --ignore-scripts

EXPOSE 8080
CMD ["node", "index.js"]
