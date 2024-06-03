# Testrail Google Sheets Addon Backend for Private Customers

# Installation

## Clone the project from Github
    git clone https://github.com/Pookie0717/Testrail-Google-Sheets-Addon-Backend.git

## Setup the Project with Docker

1. Download and Install Docker Desktop:
Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) and follow the installation instructions for your operating system.

2. Build and Run the Docker Image:
    docker build -t testrail-google-sheets-addon .
    docker run -p 3000:3000 testrail-google-sheets-addon

If you need to run the application again, you only need to execute the docker run command.
    docker run -p 3000:3000 testrail-google-sheets-addon
