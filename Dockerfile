FROM node:22-slim AS build

WORKDIR /app

COPY . .

RUN apt update && apt install -y sqlite3 build-essential python3 && apt clean

RUN npm install --ignore-scripts

RUN npm run build

FROM node:22-slim AS prod

WORKDIR /app

RUN addgroup --system app && adduser --system --ingroup app app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/database ./database
COPY --from=build /app/storage ./storage
COPY --from=build /app/node_modules ./node_modules

RUN chown -R app:app /app

USER app

ENV NODE_ENV=production

CMD [ "node", "build/", "daemon" ]