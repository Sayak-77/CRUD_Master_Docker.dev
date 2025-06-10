# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including nodemon)
RUN npm install

# Copy all source files
COPY . .

# Expose your backend port
EXPOSE 5001

# Run the dev script using nodemon
CMD ["npm", "run", "dev"]
