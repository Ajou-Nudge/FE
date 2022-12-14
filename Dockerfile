FROM node:18-alpine

WORKDIR /app

# work dir 에 build 폴더 생성 /app/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

COPY package.json /app/package.json
RUN npm install 


CMD ["npm", "start"]

EXPOSE 3000