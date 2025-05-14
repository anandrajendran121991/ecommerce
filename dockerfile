# Base image - Official lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Compile Typescript files to Javascript
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/server.js"]
