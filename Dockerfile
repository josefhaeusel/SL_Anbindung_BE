# Use an official Node.js image from the Docker Hub with Python pre-installed
FROM node:16-bullseye-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Install Python 3.12 and other dependencies
RUN apt-get update && apt-get install -y python3 python3-pip python3-dev \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    libfreetype6-dev \
    libatlas-base-dev \
    gfortran \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code
COPY . .

# Install Python libraries
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Build the NestJS application
RUN npm run build

# Use a lightweight image for the final stage
FROM node:16-bullseye-slim AS runtime

# Set the working directory
WORKDIR /usr/src/app

# Copy the built application from the build stage
COPY --from=build /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
