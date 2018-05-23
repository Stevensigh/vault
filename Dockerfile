FROM node:8.11.2
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG db_host
ARG db_port
ARG db_name
ARG db_user
ARG db_pass

ENV NODE_ENV production
ENV PORT 80
ENV DB_HOST $db_host
ENV DB_PORT $db_port
ENV DB_NAME $db_name
ENV DB_USER $db_user
ENV DB_PASS $db_pass

COPY . /vault
WORKDIR /vault

RUN npm install --production=false --unsafe-perm
RUN npm run build

CMD npm run start
