FROM node:20-slim
  WORKDIR /app
  COPY package.json ./
  RUN npm install --omit=dev
  COPY index.js ./
  ENV LEXICON_BASE_URL=https://dbssearch.today
  CMD ["node", "index.js"]
  