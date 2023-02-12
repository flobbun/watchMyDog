# Use an official Node.js runtime as the base image
FROM node:16.18.1

# ARGS
ARG PASSWORD
ARG JWT_SECRET

# Envs
ENV PASSWORD=$PASSWORD
ENV JWT_SECRET=$JWT_SECRET

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run the application
CMD ["yarn", "start"]

# Expose the default HTTP port
EXPOSE 5173
