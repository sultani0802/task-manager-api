// CRUD: Create Read Update Delete

/**
 * Imported Libararies
 */
const mongodb = require('mongodb')



/**
 * Variables
 */
const log = console.log
const { MongoClient, ObjectID } = require('mongodb')    // Destructuring MongoClient from mongodb ; Destructuring ObjectID from mongodb                   

const connectionURL = 'mongodb://127.0.0.1:27017'       // Same as localhost but using full, explicit IP to avoid potential errors
const databaseName = 'task-manager'                         // Name of the database

// A synchronous function
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

    if (error) {                                                    // If connection to DB failed
        return log('Unable to connect to database: ' + error)       
    }

    const db = client.db(databaseName)                              // Reference to the db (creating it if it doesn't already exist)

    // Promise to update 1 Document
    // db.collection('users').updateOne({ _id: new ObjectID('5ce48d6746a9763cded61e62')}, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     log(result)
    // }).catch((error) => { 
    //     log(error)
    // })

    // Update all Documents in 'tasks' db that are not completed
    // db.collection('tasks').updateMany({ completed: false}, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     log(result)
    // }).catch((error) => {
    //     log(error)
    // })


    db.collection('tasks').deleteOne({
        description: 'print'
    }).then((result) => {
        log(result)
    }).catch((error) => {
        log(error)
    })

    // db.collection('users').deleteMany({
    //     age: 24
    // }).then((result) => {
    //     log(result)
    // }).catch((error) => {
    //     log(error)
    // })
})