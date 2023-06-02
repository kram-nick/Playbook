FROM node:20.2-alpine
WORKDIR /playbook
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD npm start