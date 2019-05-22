FROM node:6.3.1
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /usr/src/wiki
EXPOSE 3000
WORKDIR /usr/src/wiki
COPY . /usr/src/wiki/
RUN npm install --production
RUN (cd gui;npm install;npm run build)
ENTRYPOINT ["node", "index.js"]
