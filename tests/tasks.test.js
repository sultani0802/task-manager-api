const log = console.log

const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')           // Get our server express app


/******* PROPERTIES **********/
// Destructure the properties and methods from the database file
// These have been moved to db.js so that other test files can have access to the same database
const { 
    userOneId, userOne, 
    userTwoId, userTwo, 
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase 
} = require('./fixtures/db')

// Runs before each test case
beforeEach(setupDatabase)



/**
 * Description:
 *      Sends a test POST request to create a new task for the user
 */
test('Should create task for user', async () => {
    const response = await request(app)                             // Get the response from the server
        .post('/tasks')
        .send({
            description : 'Test description from test suite'        // Send an object with our request
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)  // Set the auth token
        .set('Accept', 'application/json')
        .expect(201)                                                // Assert that the request will succeed

    const task = await Task.findById(response.body._id)             // Get the Task Document from the database

    expect(task).not.toBeNull()                                     // Assert that the task is not null
    expect(task.completed).toEqual(false)                           // Assert that the completed property is false
    
})


/**
 * Description:
 *      Sends a test request to retrieve all the Task Documents owned by the the User that is logged in
 */
test('Should get tasks for userOne', async () => {
    const response = await request(app)                             // Get the response from the server
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)      // Set auth token to userOne
    .set('Accept', 'application/json')
    .send()
    .expect(200)                                                    // Assert that the request will succeed

    expect(response.body.length).toEqual(2)                         // Assert that the array returned from the response has 2 elements
})


/**
 * Description:
 *      Sends a test request to delete a task
 *      Should succeed
 */
test('Should delete user task', async () => {
    await request(app)                                              // Send the request
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)  // Set the auth token
        .set('Accept', 'application/json')
        .send()
        .expect(200)                                                // Request is successful
})

/**
 * Description:
 *      Request should fail because auth token is missing in the request
 */
test('Should not delete task if unauthenticated', async () => {
    await request(app)                                              // Send request
        .delete(`/tasks/${taskOne._id}`)
        .send()
        .expect(401)                                                // Assert that we will get unauthorized response code
})

/**
 * Description:
 *      Sends a test request to delete a Task Document with a mismatched owner
 */
test('Should fail to delete task owned by different User', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)                            // The endpoint with the task object id
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)  // Set the auth token to a User that DOESN'T own the Task
        .set('Accept', 'application/json')
        .send()
        .expect(404)                                                // Assert that the request will fail

    const task = Task.findById(taskOne._id)                         // Get the Task Document from the DB
    expect(task).not.toBeNull()                                     // Assert that it still exists (aka the request failed successfully)
})


/**
 * Description:
 *      Sends a request to create a new Task without the "description" property
 *      This request should fail
 */
test('Should not create task with invalid description', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .set('Accept', 'application/json')
        .send({
            completed : false
        })
        .expect(400)
})