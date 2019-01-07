FROM node:6.3.1
ENV NPM_CONFIG_LOGLEVEL warn
ENV http_proxy "http://user02:123456@10.1.33.252:80"
ENV https_proxy "http://user02:123456@10.1.33.252:80"
RUN mkdir -p /usr/src/wiki
EXPOSE 3000
WORKDIR /usr/src/wiki
COPY . /usr/src/wiki/
RUN npm install --production
RUN (cd gui;npm install;npm run build)
ENTRYPOINT ["node", "index.js"]