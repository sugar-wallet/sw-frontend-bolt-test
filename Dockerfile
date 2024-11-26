FROM node:20.0.0-alpine3.17 AS deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# This will reduce the size of the final image because it will no longer contain unneeded archives in yarn cache dir. It is something like ~/.yarn/cache by default, while /dev/shm is a temp folder that’s not included in the image.
# By default, the size of /dev/shm is quite small so you might end up with "no space on disk" error when running yarn install. Adding --shm-size 1G to docker build command solves this.
# ENV YARN_CACHE_FOLDER=/dev/shm/yarn_cache

RUN yarn install --production --frozen-lockfile

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:20.0.0-alpine3.17 AS builder
WORKDIR /usr/src/app
COPY . .
COPY --chown=node --from=deps /usr/src/app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:20.0.0-alpine3.17 AS runner
WORKDIR /usr/src/app
ARG NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=${NODE_ENV}
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

COPY --chown=node --from=builder /usr/src/app/package.json ./package.json
COPY --chown=node --from=builder /usr/src/app/yarn.lock ./yarn.lock
COPY --chown=node --from=builder /usr/src/app/.next ./.next
COPY --chown=node --from=builder /usr/src/app/public ./public
COPY --chown=node --from=builder /usr/src/app/next.config.js ./next.config.js
COPY --chown=node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node --from=builder /usr/src/app/.env.${NODE_ENV} ./.env

USER node
EXPOSE 3000

CMD ["yarn", "start"]
