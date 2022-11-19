#Base Images
FROM node:lts-alpine

# #Working Directory (WORKDIR)
WORKDIR /usr/app


#Copy code from host to container
COPY . .

RUN yarn install


CMD ["npm","start"]