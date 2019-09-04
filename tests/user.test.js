/**
 * This test class is used to test all User endpoints in our server. 
 * 
 * It uses the 'jest' testing library in conjunction with the 'supertest' request testing library.
 * 
 * The good thing about 'supertest' is that we don't need the express server to be running (i.e. app.listen)
 */

const log = console.log

/******* LIBRARIES **********/
const request = require('supertest')        // Get the nodeJS testing library
const app = require('../src/app')           // Get our server express app
const User = require('../src/models/user')  // Tests will require User database

// Destructure the properties and methods from the database file
// These have been moved to db.js so that other test files can have access to the same database
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


// Runs once before all tests
beforeAll(() => {})
//Runs before each test case
beforeEach(setupDatabase)

// Runs after each test case
afterEach(() => {})
// Runs once after all tests
afterAll( () => {})

/**
 * Description:
 *      Sends a test POST request to the user creation endpoint
 */
test('Should sign up a new user', async () => {
    const response = await request(app).post('/users')              // Send a request to the test db
        .send({                                                     // The request body
            name: "Test User",
            email: "haamed.sultani@gmail.com",
            password: "hhahahah123"
        })
        .set('Accept', 'application/json')                          // Set request options
        .expect(201)

        // Check our db if the user was actually saved
        const user = await User.findById(response.body.user._id)    // Get the user object from the db using the object id
        expect(user).not.toBeNull()                                 // assert that the user DOES exist

        // Assert that the response includes these properties
        expect(response.body).toMatchObject({
            user: {
                name: 'Test User',
                email: 'haamed.sultani@gmail.com',
            },
            newToken: user.tokens[0].token
        })

        // Assert that the password is not being saved as plaintext
        expect(user.password).not.toBe('nodejs!69')
})


/**
 * Description:
 *      Sends a test request to create a new User with invalid password and email
 */
test('Should not signup user with invalid name/email/password', async () => {
    const response = await request(app)                             // Get the response from the server
        .post('/users')
        .set('Accept', 'application/json')
        .send({
            name: 'Test fail',                                  
            email: 'adwjk 2',                                       // Invalid email
            password: 'password'                                    // Invalid passowrd
        })
        .expect(400)

    // Assert password and email are invalid formats when signing up
    expect(response.body.errors.email.message).toEqual('Email is invalid format')
    expect(response.body.errors.password.message).toEqual('Password cannot have \'password\' in it.')
    
    const user = await User.findOne({name : 'Test fail'})           // Try to find the User Document
    expect(user).toBeNull()                                         // Assert that it will not exist
})

/**
 * Description:
 *      Sends a test POST request to the user login endpoint
 */
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login')        // Make a request to login endpoint to the test DB
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .set('Accept', 'application/json')
        .expect(200)


        const user = await User.findById(userOneId)                 // Get the user object from the DB using the object id we manually created for testing (top of file)

        // Assert that the user object will have a new token after logging in
        expect(response.body.newToken).toBe(user.tokens[1].token)   // We get the 2nd token in the array because we already give the test user a token 
})

/**
 * Description:
 *      Sends a test POST request to the user login endpoint but with incorrect login information.
 * 
 */
test('Login should fail with existing user', async () => {
    await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password : userOne.password + 'wrong'
        })
        .set('Accept', 'application/json')
        .expect(400)
})

/**
 * Description:
 *      Sends a test GET request to the endpoint that returns the user document if it is authenticated properly
 */
test('Get user profile with authentication', async () => {
    await request(app).get('/users/me')
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // remember this is a template string (aka not an apostraphe)
        .set('Accept', 'application/json')
        .expect(200)
})

/**
 * Description:
 *      Sends a test GET request to the endpoint that returns the user document but without an auth token
 */
test('Getting user profile should fail authentication', async () => {
    await request(app).get('/users/me')
        .send()
        .set('Accept', 'application/json')
        .expect(401)            // Not authorized response
})

/**
 * Description:
 *      Sends a test DELETE request to the user deletion endpoint
 */
test('Should delete account for user', async () => {
    const response = await request(app).delete('/users/me')             // Get response from test
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .set('Accept', 'application/json')
        .expect(200)                                                    // Assert that deletion was successful

    const user = await User.findById(userOneId)                         // Try to find user in the DB using the object id

    expect(user).toBeNull()                                             // Assert that the DB will return null
})

/**
 * Description:
 *      Sends a test DELETE request to the user deletion endpoint which should fail since we aren't passing an auth token
 */
test('Should not deete user if unauthenticated', async () => {
    await request(app).delete('/users/me')
        .send()
        .set('Accept', 'application/json')
        .expect(401)            // Not authorized response
})

/**
 * Description:
 *      Sends a test POST request to the endpoint that is expecting an image
 * 
 */
test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')                         // Get the response from the test
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)      // Set the authorization token
        .attach('avatarUpload', 'tests/fixtures/profile-pic.jpg')       // Add a file to the request
        .set('Accept', 'application/json')                              
        .expect(200)                                                    // Assert that the file will be successfully sent to the server

    const user = await User.findById(userOneId)                         // Get the user from the DB
    expect(user.avatar).toEqual(expect.any(Buffer))                     // Assert that the user's avatar property is of type 'Buffer'
})


/**
 * Description:
 *      Sends a test PATCH request to update a user's name on the User Document in the DB
 */
test('Should update user name', async () => {    
    await request(app).patch('/users/me')              // Get the response from the test
        .send({                                     
            name : "Haamed"                                             // Send an object 
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)      // Set the auth token
        .set('Accept', 'application/json')
        .expect(200)                                                    // Assert that the request will succeed

    const user = await User.findById(userOneId)                         // Get the user object from the DB using the object id we manually created for testing (top of file)

    expect(user.name).toEqual('Haamed')                                    // Assert that the User Document in the DB will have the new name
})


/**
 * Description:
 *      Sends a test PATCH request to update a property of the User Document that doesn't exist
 */
test('Should not update invalid user fields', async () => {
    await request(app).patch('/users/me')                               // Send request to server
        .send({
            location : 'Ottawa'                                         // Send object in request object
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)      // Set the auth token
        .set('Accept', 'application/json')                              
        .expect(400)                                                    // Assert that the request will fail
})

/**
 * Description:
 *      Sends a test PATCH request to update the age of the User but with a bad auth token
 */
test('Should not update user if unauthenticated', async () => {
    await request(app)                  
        .patch('/users/me')    
        .set('Authentication', 'bad auth token')                        // Send an incorrect auth token
        .set('Accept', 'application/json')                          
        .send({
            age: 30                                                     // Try to update age
        })
        .expect(401)                                                    // Assert that the request will fail
})


test('Shuold not update user with invalid name/email/password', async () => {
    const response = await request(app)                                 // Get the response from the server
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)      // Set the auth token
        .set('Accept', 'application/json')
        .send({
            email : 'jkahw 2jkh@gmail.com',                             // Update with a bad email
            password: 'password'                                        // Update with a bad password
        })
        .expect(400)

    // Assert that email and password are invalid
    expect(response.body.errors.email.message).toEqual('Email is invalid format')
    expect(response.body.errors.password.message).toEqual('Password cannot have \'password\' in it.')

    const user = await User.findById(userOneId)                         // Get the User Document from the DB
    expect(user.name).toEqual('User One')                               // Assert that the name wasn't changed
    expect(user.password).not.toEqual('password')                       // Assert that the password wasn't changed
})