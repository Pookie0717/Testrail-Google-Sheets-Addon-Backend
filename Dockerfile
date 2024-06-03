# Use the official Node.js image from the Docker Hub
FROM node:18

# Create and change to the app directory
WORKDIR /

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "./app.js"]