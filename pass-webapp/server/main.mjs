import express from "express"
import bodyParser from 'body-parser'


// middleware import
import auth from './middleware/auth.mjs'
import cors from "./middleware/cors.mjs"
import getCurrentFolder from './middleware/getCurrentFolder.mjs'
import onError from './middleware/onError.mjs'


// routes import
import authCheck from "./routes/authCheck.mjs"
import getFile from "./routes/getFile.mjs"
import getFilesList from "./routes/getFilesList.mjs"
import login from "./routes/login.mjs"


// some vars
global.SERVER_PORT = 4243
global.JWT_SECRET = 'example' // OSU sens :P

const app = express()



// middleware init
app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(auth) // get currentUser
app.use(getCurrentFolder) // get currentFolder






/* routes */

// checks
app.post('/authCheck', authCheck)


// user interactions
app.post('/login', login)


// files interactions
app.post('/getFilesList', getFilesList)

app.post('/getFile', getFile)


/* --- */


app.use(onError) // error handlers


const server = app.listen(global.SERVER_PORT, (error) => {
  if (error) return console.log(`Error: ${error}`)

  console.log(`Server listening on port ${server.address().port}`)
})