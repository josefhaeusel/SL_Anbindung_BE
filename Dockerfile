# Use an official Node.js image from the Docker Hub
FROM node:16-bullseye-slim

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
    libsndfile1-dev \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create a symlink for python3 to python
RUN ln -s /usr/bin/python3 /usr/bin/python

# Copy the rest of the application code
COPY . .

# Install Python libraries
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
