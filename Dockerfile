
FROM node:latest

COPY . /var/www

WORKDIR /var/www

RUN npm install -g pnpm
RUN pnpm install

ENTRYPOINT ["pnpm","start"]