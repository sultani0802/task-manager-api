# Task Manager

## About
Task Manager is a web application that allows you to create users and tasks. I created this app to learn how to create a RESTful service and features encryption, a MongoDB database, a Test Suite, middleware such as authentication, environment variables, library mocking, and other Node.js tools.

## Requirements
- Node 12
- npm
- Postman (or API tester of your choice)

## Using Task Manager
### Introduction
Task Manager RESTful web service can be used via an API tester. Postman was used to test and use Task Manager so the setup and usage detailed below will be specific to Postman. Though, the API is hosted on Heroku and is accessible from any client.

#### User Routes


## Installation
#### Clone the repo and install the dependencies
    
    git clone https://github.com/sultani0802/task-manager-api
    cd task-manager-api
    
    npm install


## How to...
### Run locally

#### Step 1 - Download/Install MongoDB Community Server
    - https://www.mongodb.com/download-center/community
    - Unzip in /Users/user_name
    - Create a new "data" folder in /mongodb-data
    - In terminal, run this command: /Users/user_name/mongodb/bin/mongod --dbpath=/Users/user_name/mongodb-data/
        - replace <user_name> with your username
        

#### Step 2 - Run the web server
    - In terminal, change directory to where you cloned task-manager-api
    - In terminal, type 'npm run dev' to start the server
    - You should see this message in your terminal if everything was successful

![Successful run](/ss_1.png)

#### Test Suite
    - Tests can be run by typing 'npm test' in terminal



