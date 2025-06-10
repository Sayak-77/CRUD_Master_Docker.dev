# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies specified in package.json
RUN npm install

# Copy all files from the current directory on the host into the container's working directory
COPY . .

# Expose port 3000 to allow access to the React development server from outside the container
EXPOSE 3000

# Run the React development server using the "dev" script defined in package.json
CMD ["npm", "run", "dev"]
