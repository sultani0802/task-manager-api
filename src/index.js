// Shortcut for printing to console
const log = console.log   

const express = require('express')
    
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

require('./db/mongoose')                            // Runs the file that connects to the mongoose database

 
/**
 * Express settings
 */
const app = express()
const PORT = process.env.PORT
app.use(express.json())                             // Automatically parse incoming JSON into javascript objects


/**
 * Endpoints from routers
 */
app.use(userRouter)                                 // User router
app.use(taskRouter)                                 // Task router


/**
 * Run the server   
 */ 
app.listen(PORT, () => {
    log('Server is running on port ', PORT)
})