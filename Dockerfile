FROM acd-docker.repository.milieuinfo.be/node:12

ARG VERSION
ARG REPO

ENV NODE_ENV=SKIP_WCT_SAUCE_POSTINSTALL_DOWNLOAD

COPY .npmrc /root/.npmrc
COPY .gitconfig /root/.gitconfig
COPY .git-credentials /root/.git-credentials

WORKDIR /home/node/

RUN git clone ${REPO} app

WORKDIR /home/node/app

RUN npm install \
    && npm run release:prepare \
    && npm run release:testless -- ${VERSION}
