FROM node:22-alpine AS build

WORKDIR /app

COPY . .

RUN npm install --ignore-scripts

RUN npm run build

FROM node:22-alpine AS prod

WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules

RUN chown -R app:app /app

USER app

ENV NODE_ENV=production

CMD [ "npm", "start", "daemon" ]