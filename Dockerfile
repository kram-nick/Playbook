FROM node:20.2-alpine
WORKDIR /playbook
COPY package.json .
ENV PATH="./node_modules/.bin:$PATH"
RUN npm install
COPY . .

ENV NODE_ENV production

EXPOSE 3000
CMD npm start