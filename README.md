# Task Manager

## About
Task Manager is a web application that allows you to create users and tasks. I created this app to learn how to create a RESTful service and features encryption, a MongoDB database, a Test Suite, middleware such as authentication, environment variables, library mocking, and other Node.js tools.

## Requirements
- Node 12
- npm
- Postman (or API tester of your choice)

## Using Task Manager API
### Introduction
Task Manager RESTful web service can be used via an API tester. Postman was used to test and use Task Manager so the setup and usage detailed below will be specific to Postman. Though, the API is hosted on Heroku and is accessible from any client.



### Environment Setup  
#### Set Environment Variables
    - These variables are case sensitive
    - url value must = https://sultani-task-manager.herokuapp.com
    - authToken doesn't need to be initialized as it will be assigned a value once you have made a request to the API where an authentication token is returned
![Postman Environment Variables](/postman_env_var.png)

#### Create Request Collection
    - The API has a total of 16 endpoints outlined below
    - You only have to set the Bearer Token for this collection (pictured below)
![Collection](/api_collection.png) ![Collection Setting](/edit_collection.png)

    
## Making API Requests

### Request Tests
The following requests require you to add this code to the `Tests` tab for the request
```js
if (pm.response.code === 200) {
    pm.environment.set('authToken', pm.response.json().newToken)
}
```
`Create User` & `Login User`

## User Routes (POST)
### - Create User
`Endpoint` : {{url}}/users

`Headers` :  Content-Type : application/json

`Body` (JSON)
```json
{
    "name" : "your name",
    "email" : "your email",
    "password" : "your password"
}
```

### - Login User
`Endpoint` : {{url}}/users/login

`Headers` :  Content-Type : application/json

`Body` (JSON)
```json
{
    "email" : "your email",
    "password" : "your password"
}
```

### - Logout 
`Endpoint` : {{url}}/users/logout

`Authorization` : Inherit auth from parent

`Headers` :  Content-Type : application/json


### - Logout All Sessions 
`Endpoint` : {{url}}/users/logoutAll

`Headers` :  Content-Type : application/json


### - Avatar Image Upload
`Endpoint` : {{url}}/users/me/avatar

`Authorization` : Inherit auth from parent

`Body` (form-data)
```
avatarUpload : image.jpg
```

## User Routes (GET)
### - Read User
`Endpoint` : {{url}}/users/<user's object id>

`Authorization` : Inherit auth from parent

### - Read My Profile
`Endpoint` : {{url}}/users/me

`Authorization` : Inherit auth from parent

### - Get Avatar By ID
`Endpoint` : {{url}}/users/me

`Authorization` : Inherit auth from parent

## User Routes (PATCH)
### - Update User
`Endpoint` : {{url}}/users/<user's object id>/avatar

`Authorization` : Inherit auth from parent


## User Routes (DELETE)
### - Delete User
`Endpoint` : {{url}}/users/me

`Authorization` : Inherit auth from parent

`Headers` :  Content-Type : application/json

### - Delete Avatar
`Endpoint` : {{url}}/users/me/avatar

`Authorization` : Inherit auth from parent




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



