/******* LIBRARIES **********/
const jwt = require('jsonwebtoken')             // Used for authentication
const mongoose = require('mongoose')            // Used to create our own Object Id
const User = require('../../src/models/user')   // Load the 'User' class
const Task = require('../../src/models/task')   // Load the 'Task' class


/******* PROPERTIES **********/
const userOneId = new mongoose.Types.ObjectId() // Create an object id for the User Document that is going to be saved in the DB
const userOne = {
    _id: userOneId,                             // Set the object id from above
    name : 'User One',
    email : 'userOne@gmail.com',
    password: 'nodejs!69',
    tokens: [{                      // Set the token ourselves
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId() // Create our own object id for the User Document
const userTwo = {
    _id: userTwoId,
    name : 'User Two',
    email : 'userTwo@gmail.com',
    password: 'nodejs!70',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Test Task One',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Test Task Test',
    completed: true,
    owner: userTwoId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Test Task Three',
    completed: true,
    owner: userOneId
}

const setupDatabase = async () => {
    await User.deleteMany()         // Clear the DB of any User Documents before any test requests are made
    await Task.deleteMany()         // Clear the DB if any Task Documents before any test requests are made

    // Populate the test DB 
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}


module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}


