FROM node:20
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run tsc
CMD ["npm", "start"]