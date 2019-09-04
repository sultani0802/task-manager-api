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