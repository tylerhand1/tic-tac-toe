FROM node:20
WORKDIR /app
COPY ./backend .
RUN npm ci
RUN npm run tsc
CMD ["npm", "run", "dev"]